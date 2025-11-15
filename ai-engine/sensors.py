# sensors.py
import math, time
from typing import Tuple
import numpy as np
try:
    import cv2
except Exception:
    cv2 = None
try:
    import mediapipe as mp
except Exception:
    mp = None
try:
    import librosa
except Exception:
    librosa = None
from .constants import WEBCAM_INDEX, FRAME_WIDTH, FRAME_HEIGHT, MOTION_THRESHOLD, CRY_ENERGY_THRESHOLD

def audio_energy_from_file(path: str, sr: int = 16000) -> float:
    if librosa is None:
        return 0.0
    y, _ = librosa.load(path, sr=sr, mono=True)
    if y.size == 0:
        return 0.0
    return float(np.mean(y ** 2))

def classify_cry_simple(audio_path: str) -> Tuple[str, str]:
    energy = audio_energy_from_file(audio_path)
    cry = "crying" if energy > CRY_ENERGY_THRESHOLD else "not_crying"
    cry_type = "none"
    if cry == "crying":
        if librosa is None:
            cry_type = "discomfort"
        else:
            y, sr = librosa.load(audio_path, sr=16000, mono=True)
            centroid = float(np.mean(librosa.feature.spectral_centroid(y=y, sr=sr)))
            if centroid > 3000:
                cry_type = "pain"
            elif centroid > 1500:
                cry_type = "hunger"
            else:
                cry_type = "discomfort"
    return cry, cry_type

class MotionDetector:
    def __init__(self, index=WEBCAM_INDEX):
        self.index = index
        self.cap = None
        self.last_frame = None

    def _open(self):
        if cv2 is None:
            return False
        if self.cap is None:
            self.cap = cv2.VideoCapture(self.index)
            self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, FRAME_WIDTH)
            self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, FRAME_HEIGHT)
            time.sleep(0.1)
        return self.cap.isOpened()

    def sample_motion(self, samples: int = 3) -> float:
        if not self._open():
            return 0.0
        energies = []
        for _ in range(samples):
            ret, frame = self.cap.read()
            if not ret:
                continue
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            gray = cv2.GaussianBlur(gray, (5,5), 0)
            if self.last_frame is None:
                self.last_frame = gray
                energies.append(0.0)
                continue
            diff = cv2.absdiff(self.last_frame, gray)
            energy = float(diff.sum())
            energies.append(energy)
            self.last_frame = gray
            time.sleep(0.03)
        return float(np.median(energies))

class PostureDetector:
    def __init__(self, index=WEBCAM_INDEX):
        self.index = index
        self.cap = None
        self.pose = None

    def _open(self):
        if cv2 is None or mp is None:
            return False
        if self.cap is None:
            self.cap = cv2.VideoCapture(self.index)
            self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, FRAME_WIDTH)
            self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, FRAME_HEIGHT)
        if self.pose is None:
            self.pose = mp.solutions.pose.Pose(static_image_mode=False, min_detection_confidence=0.5)
        return self.cap.isOpened()

    def sample_posture(self, tries: int = 2) -> str:
        if not self._open():
            return "unknown"
        for _ in range(tries):
            ret, frame = self.cap.read()
            if not ret:
                continue
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            res = self.pose.process(rgb)
            if not res.pose_landmarks:
                continue
            lm = res.pose_landmarks.landmark
            left_sh = lm[11]
            right_sh = lm[12]
            left_hip = lm[23]
            right_hip = lm[24]
            dx = right_sh.x - left_sh.x
            dy = right_sh.y - left_sh.y
            angle_deg = abs(math.degrees(math.atan2(dy, dx)))
            if angle_deg < 10:
                mean_sh_y = (left_sh.y + right_sh.y)/2.0
                mean_hip_y = (left_hip.y + right_hip.y)/2.0
                if mean_hip_y > mean_sh_y:
                    return "on_back"
                else:
                    return "on_stomach"
            else:
                return "on_side"
        return "unknown"

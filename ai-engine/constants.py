# constants.py
# Shared states MUST match the JS constants exactly
STATES = [
    "sleeping",
    "restless",
    "crying",
    "distress",
    "may_wake_soon",
    "unsafe",
]

# Allowed values (for validation)
CRY_VALUES = ["crying", "not_crying"]
CRY_TYPE_VALUES = ["hunger", "pain", "discomfort", "none"]
MOTION_VALUES = ["restless", "calm"]
POSTURE_VALUES = ["on_back", "on_side", "on_stomach", "unknown"]

# Webcam config
WEBCAM_INDEX = 0
FRAME_WIDTH = 640
FRAME_HEIGHT = 480

# Fusion thresholds (tweakable)
MOTION_THRESHOLD = 1500.0  # motion energy threshold -> restless vs calm
CRY_ENERGY_THRESHOLD = 0.01  # audio energy threshold for cry vs not cry

# Return fallback JSON
FALLBACK = {
    "cry": "not_crying",
    "cry_type": "none",
    "motion": "calm",
    "posture": "unknown",
    "state": "sleeping",
    "timestamp": 1700000000,
}

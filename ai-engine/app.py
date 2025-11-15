# app.py
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import logging, traceback
from .utils import now_ts
from .constants import FALLBACK
from .sensors import MotionDetector, PostureDetector, classify_cry_simple
from .fusion import fuse

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

motion_detector = MotionDetector()
posture_detector = PostureDetector()

@app.get("/status")
async def status():
    try:
        try:
            cry, cry_type = classify_cry_simple("sample.wav")
        except Exception:
            cry, cry_type = FALLBACK["cry"], FALLBACK["cry_type"]
        motion_energy = motion_detector.sample_motion(samples=3)
        motion = "restless" if motion_energy > 1500.0 else "calm"
        posture = posture_detector.sample_posture(tries=2)
        state = fuse(cry, cry_type, motion, posture)
        payload = {
            "cry": cry,
            "cry_type": cry_type,
            "motion": motion,
            "posture": posture,
            "state": state,
            "timestamp": now_ts(),
        }
        return JSONResponse(content=payload)
    except Exception as e:
        logging.error("Status handler failed: %s", traceback.format_exc())
        return JSONResponse(content=FALLBACK)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("ai_engine.app:app", host="10.7.74.62", port=8000, log_level="info")

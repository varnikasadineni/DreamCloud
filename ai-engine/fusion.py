# fusion.py
from .constants import STATES
def fuse(cry: str, cry_type: str, motion: str, posture: str) -> str:
    if cry == "crying" and cry_type == "pain":
        return "distress"
    if cry == "crying" and motion == "restless":
        return "crying"
    if motion == "restless" and cry == "not_crying":
        return "may_wake_soon"
    if cry == "not_crying" and motion == "calm":
        return "sleeping"
    if posture == "on_stomach" and cry == "crying":
        return "unsafe"
    if cry == "crying":
        return "crying"
    return "restless"

# utils.py
import time
from typing import Dict

def now_ts() -> int:
    return int(time.time())

def ensure_schema(d: Dict) -> Dict:
    # Minimal pass-through -- callers ensure schema matches.
    return d

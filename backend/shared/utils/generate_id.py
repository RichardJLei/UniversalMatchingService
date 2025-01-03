import time
import uuid

def generate_unique_id(prefix: str = '') -> str:
    """
    Generates a unique, sortable ID with an optional prefix
    """
    timestamp = int(time.time() * 1000)
    unique = str(uuid.uuid4())[:8]
    return f"{prefix}{timestamp}{unique}" 
import os
from pathlib import Path

class Config:
    # Firebase
    FIREBASE_CONFIG = Path(os.getenv('FIREBASE_CONFIG_PATH')).read_text()
    
    # Google Cloud Storage
    GCS_BUCKET = os.getenv('GCS_BUCKET')
    
    # MongoDB
    MONGODB_URI = os.getenv('MONGODB_URI')
    
    # OpenAI
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY') 
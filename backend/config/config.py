from pathlib import Path
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    # Base configuration
    BASE_DIR = Path(__file__).parent.parent
    
    # Flask configuration
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY')
    DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    # Google Cloud configuration
    GCS_BUCKET = os.getenv('GCS_BUCKET')
    GOOGLE_CLOUD_PROJECT = os.getenv('GOOGLE_CLOUD_PROJECT')
    
    # MongoDB configuration
    MONGODB_URI = os.getenv('MONGODB_URI')
    
    # OpenAI configuration
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    
    # Firebase configuration
    FIREBASE_CONFIG = {
        "apiKey": os.getenv('FIREBASE_API_KEY'),
        "authDomain": os.getenv('FIREBASE_AUTH_DOMAIN'),
        "projectId": os.getenv('FIREBASE_PROJECT_ID'),
        "storageBucket": os.getenv('FIREBASE_STORAGE_BUCKET'),
        "messagingSenderId": os.getenv('FIREBASE_MESSAGING_SENDER_ID'),
        "appId": os.getenv('FIREBASE_APP_ID')
    } 
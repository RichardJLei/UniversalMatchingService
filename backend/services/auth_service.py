import firebase_admin
from firebase_admin import auth, credentials
from flask import current_app
from typing import Optional, Dict, Any

class AuthService:
    def __init__(self):
        # Future log: Firebase initialization
        if not firebase_admin._apps:
            cred = credentials.Certificate(current_app.config['FIREBASE_CONFIG'])
            firebase_admin.initialize_app(cred)
    
    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        # Future log: Token verification attempt
        try:
            decoded_token = auth.verify_id_token(token)
            return {
                'uid': decoded_token['uid'],
                'email': decoded_token.get('email', ''),
                'name': decoded_token.get('name', '')
            }
        except Exception as e:
            # Future log: Token verification failed
            return None
    
    def get_user_role(self, user_id: str) -> str:
        # Future log: User role lookup
        try:
            user = auth.get_user(user_id)
            claims = user.custom_claims or {}
            return claims.get('role', 'user')
        except:
            return 'user'

auth_service = AuthService() 
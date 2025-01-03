from typing import Dict, Any, Optional
from services.db_service import db_service

class UserModel:
    collection = 'users'
    
    @staticmethod
    def create_user(user_id: str, email: str, role: str = 'user') -> str:
        # Future log: Creating user record
        data = {
            'user_id': user_id,
            'email': email,
            'role': role,
            'status': 'active'
        }
        return db_service.create_document(UserModel.collection, data)
    
    @staticmethod
    def get_user(user_id: str) -> Optional[Dict[str, Any]]:
        # Future log: Retrieving user
        results = db_service.find_documents(UserModel.collection, {'user_id': user_id})
        return results[0] if results else None
    
    @staticmethod
    def update_user_role(user_id: str, role: str) -> bool:
        # Future log: Updating user role
        return db_service.update_document(
            UserModel.collection,
            user_id,
            {'role': role}
        )
    
    @staticmethod
    def list_users():
        # Future log: Listing all users
        return db_service.find_documents(UserModel.collection, {}) 
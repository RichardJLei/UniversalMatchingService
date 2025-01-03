from typing import Dict, Any, List
from services.auth_service import auth_service
from .models import UserModel

class UserService:
    @staticmethod
    def create_or_update_user(user_data: Dict[str, Any]) -> Dict[str, Any]:
        # Future log: User creation/update process
        user_id = user_data['uid']
        email = user_data.get('email', '')
        
        existing_user = UserModel.get_user(user_id)
        if not existing_user:
            # Create new user
            UserModel.create_user(user_id, email)
            # Future log: New user created
        
        return UserModel.get_user(user_id)
    
    @staticmethod
    def update_role(user_id: str, new_role: str, admin_user_id: str) -> bool:
        # Future log: Role update attempt
        
        # Verify admin privileges
        admin_role = auth_service.get_user_role(admin_user_id)
        if admin_role != 'admin':
            raise ValueError("Unauthorized role modification attempt")
        
        # Update role
        success = UserModel.update_user_role(user_id, new_role)
        if success:
            # Future log: Role updated successfully
            return True
        return False
    
    @staticmethod
    def list_all_users(admin_user_id: str) -> List[Dict[str, Any]]:
        # Future log: User listing attempt
        
        # Verify admin privileges
        admin_role = auth_service.get_user_role(admin_user_id)
        if admin_role != 'admin':
            raise ValueError("Unauthorized access to user list")
        
        return UserModel.list_users()

user_service = UserService() 
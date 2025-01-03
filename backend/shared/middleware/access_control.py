from functools import wraps
from flask import g
from services.auth_service import auth_service

def require_role(required_role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_role = auth_service.get_user_role(g.user['uid'])
            
            if required_role == 'admin' and user_role != 'admin':
                # Future log: Unauthorized access attempt
                return {'error': 'Admin access required'}, 403
                
            return f(*args, **kwargs)
        return decorated_function
    return decorator 
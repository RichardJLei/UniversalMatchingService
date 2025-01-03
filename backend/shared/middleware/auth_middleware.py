from functools import wraps
from flask import request, g
from services.auth_service import auth_service

def require_auth():
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                return {'error': 'No authorization header'}, 401

            token = auth_header.split(' ')[1]
            user_data = auth_service.verify_token(token)
            
            if not user_data:
                return {'error': 'Invalid token'}, 401

            # Future log: User authenticated
            g.user = user_data
            return f(*args, **kwargs)
        return decorated_function
    return decorator 
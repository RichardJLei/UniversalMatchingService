from flask import Blueprint, request, jsonify
from shared.middleware.auth_middleware import require_auth
from shared.middleware.access_control import require_role
from .services import user_service

user_bp = Blueprint('user', __name__)

@user_bp.route('/profile', methods=['GET'])
@require_auth()
def get_profile():
    # Future log: Profile request
    user_id = request.user['uid']
    user_data = user_service.create_or_update_user(request.user)
    return jsonify(user_data), 200

@user_bp.route('/users', methods=['GET'])
@require_auth()
@require_role('admin')
def list_users():
    # Future log: User list request
    try:
        admin_user_id = request.user['uid']
        users = user_service.list_all_users(admin_user_id)
        return jsonify(users), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 403
    except Exception as e:
        # Future log: User listing failed
        return jsonify({'error': str(e)}), 500

@user_bp.route('/role', methods=['PUT'])
@require_auth()
@require_role('admin')
def update_user_role():
    # Future log: Role update request
    data = request.get_json()
    if not data or 'user_id' not in data or 'role' not in data:
        return jsonify({'error': 'Invalid request data'}), 400
    
    try:
        admin_user_id = request.user['uid']
        success = user_service.update_role(
            data['user_id'],
            data['role'],
            admin_user_id
        )
        if success:
            return jsonify({'message': 'Role updated successfully'}), 200
        return jsonify({'error': 'Role update failed'}), 500
    except ValueError as e:
        return jsonify({'error': str(e)}), 403
    except Exception as e:
        # Future log: Role update failed
        return jsonify({'error': str(e)}), 500 
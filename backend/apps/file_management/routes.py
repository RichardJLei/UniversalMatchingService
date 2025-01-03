from flask import Blueprint, request, jsonify
from shared.middleware.auth_middleware import require_auth
from shared.middleware.access_control import require_role
from .services import file_service

file_bp = Blueprint('file', __name__)

@file_bp.route('/upload', methods=['POST'])
@require_auth()
def upload_file():
    # Future log: File upload request received
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
        
    file = request.files['file']
    user_id = request.user['uid']  # Set by auth middleware
    
    result = file_service.upload_file(file, user_id, file.filename)
    if not result:
        return jsonify({'error': 'Upload failed'}), 500
        
    return jsonify(result), 200

@file_bp.route('/list', methods=['GET'])
@require_auth()
def list_files():
    # Future log: File list request received
    user_id = request.user['uid']
    files = file_service.list_files(user_id)
    return jsonify(files), 200 
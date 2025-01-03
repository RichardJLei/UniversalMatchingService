from flask import Blueprint, request, jsonify
from shared.middleware.auth_middleware import require_auth
from .services import parsing_service

parsing_bp = Blueprint('parsing', __name__)

@parsing_bp.route('/parse', methods=['POST'])
@require_auth()
def parse_file():
    # Future log: Parse request received
    data = request.get_json()
    if not data or 'file_path' not in data:
        return jsonify({'error': 'No file path provided'}), 400
    
    try:
        user_id = request.user['uid']  # Set by auth middleware
        result = parsing_service.parse_pdf(data['file_path'], user_id)
        return jsonify(result), 200
    except Exception as e:
        # Future log: Parse failed
        return jsonify({'error': str(e)}), 500

@parsing_bp.route('/result/<file_id>', methods=['GET'])
@require_auth()
def get_parse_result(file_id):
    # Future log: Parse result request
    result = ParseResultModel.get_parse_result(file_id)
    if not result:
        return jsonify({'error': 'Result not found'}), 404
    return jsonify(result), 200 
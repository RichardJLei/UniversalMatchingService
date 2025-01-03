from flask import Blueprint, request, jsonify
from shared.middleware.auth_middleware import require_auth
from .services import comparison_service
from .models import ComparisonModel

comparison_bp = Blueprint('comparison', __name__)

@comparison_bp.route('/compare', methods=['POST'])
@require_auth()
def create_comparison():
    # Future log: Comparison request received
    data = request.get_json()
    if not data or 'source_ids' not in data or len(data['source_ids']) != 2:
        return jsonify({'error': 'Invalid source IDs'}), 400
    
    try:
        user_id = request.user['uid']
        result = comparison_service.create_comparison(user_id, data['source_ids'])
        return jsonify(result), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        # Future log: Comparison failed
        return jsonify({'error': str(e)}), 500

@comparison_bp.route('/list', methods=['GET'])
@require_auth()
def list_comparisons():
    # Future log: Listing comparisons
    user_id = request.user['uid']
    comparisons = ComparisonModel.list_user_comparisons(user_id)
    return jsonify(comparisons), 200

@comparison_bp.route('/<comparison_id>', methods=['GET'])
@require_auth()
def get_comparison(comparison_id):
    # Future log: Retrieving comparison
    comparison = ComparisonModel.get_comparison(comparison_id)
    if not comparison:
        return jsonify({'error': 'Comparison not found'}), 404
    return jsonify(comparison), 200 
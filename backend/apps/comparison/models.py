from typing import Dict, Any, List
from services.db_service import db_service

class ComparisonModel:
    collection = 'comparisons'
    
    @staticmethod
    def create_comparison(user_id: str, source_ids: List[str], result: Dict[str, Any]) -> str:
        # Future log: Creating comparison record
        data = {
            'user_id': user_id,
            'source_ids': source_ids,
            'result': result,
            'status': 'completed'
        }
        return db_service.create_document(ComparisonModel.collection, data)
    
    @staticmethod
    def get_comparison(comparison_id: str):
        # Future log: Retrieving comparison
        results = db_service.find_documents(ComparisonModel.collection, {'_id': comparison_id})
        return results[0] if results else None
    
    @staticmethod
    def list_user_comparisons(user_id: str):
        # Future log: Listing user comparisons
        return db_service.find_documents(ComparisonModel.collection, {'user_id': user_id}) 
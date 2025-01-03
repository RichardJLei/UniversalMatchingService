from typing import Dict, Any
from services.db_service import db_service

class ParseResultModel:
    collection = 'parse_results'
    
    @staticmethod
    def create_parse_result(file_id: str, user_id: str, parsed_data: Dict[str, Any]) -> str:
        # Future log: Creating parse result
        data = {
            'file_id': file_id,
            'user_id': user_id,
            'parsed_data': parsed_data,
            'status': 'completed'
        }
        return db_service.create_document(ParseResultModel.collection, data)
    
    @staticmethod
    def get_parse_result(file_id: str):
        # Future log: Retrieving parse result
        results = db_service.find_documents(ParseResultModel.collection, {'file_id': file_id})
        return results[0] if results else None 
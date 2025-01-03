from pymongo import MongoClient
from flask import current_app
from typing import Dict, List, Any, Optional
from datetime import datetime

class DatabaseService:
    def __init__(self):
        self.client = MongoClient(current_app.config['MONGODB_URI'])
        self.db = self.client.universal_matching
    
    def create_document(self, collection: str, data: Dict[str, Any]) -> Optional[str]:
        # Future log: Document creation
        try:
            data['created_at'] = datetime.utcnow()
            data['updated_at'] = datetime.utcnow()
            result = self.db[collection].insert_one(data)
            return str(result.inserted_id)
        except Exception as e:
            # Future log: Document creation failed
            return None
    
    def find_documents(self, collection: str, query: Dict[str, Any]) -> List[Dict[str, Any]]:
        # Future log: Document query
        try:
            return list(self.db[collection].find(query))
        except Exception as e:
            # Future log: Document query failed
            return []
    
    def update_document(self, collection: str, doc_id: str, data: Dict[str, Any]) -> bool:
        # Future log: Document update
        try:
            data['updated_at'] = datetime.utcnow()
            result = self.db[collection].update_one(
                {'_id': doc_id},
                {'$set': data}
            )
            return result.modified_count > 0
        except Exception as e:
            # Future log: Document update failed
            return False

db_service = DatabaseService() 
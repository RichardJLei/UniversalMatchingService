from typing import Dict, Any
from services.db_service import db_service

class FileModel:
    collection = 'files'
    
    @staticmethod
    def create_file_record(user_id: str, file_path: str, metadata: Dict[str, Any]) -> str:
        # Future log: Creating file record
        data = {
            'user_id': user_id,
            'file_path': file_path,
            'status': 'uploaded',
            'metadata': metadata
        }
        return db_service.create_document(FileModel.collection, data)
    
    @staticmethod
    def get_user_files(user_id: str):
        # Future log: Retrieving user files
        return db_service.find_documents(FileModel.collection, {'user_id': user_id}) 
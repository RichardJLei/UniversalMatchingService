from typing import BinaryIO, Optional, Dict, Any
from services.storage_service import storage_service
from .models import FileModel

class FileService:
    @staticmethod
    def upload_file(file: BinaryIO, user_id: str, filename: str) -> Optional[Dict[str, Any]]:
        # Future log: File upload process started
        
        # Upload to storage
        file_path = storage_service.upload_file(file, user_id, filename)
        if not file_path:
            return None
            
        # Create database record
        metadata = {
            'original_filename': filename,
            'content_type': file.content_type if hasattr(file, 'content_type') else None
        }
        
        file_id = FileModel.create_file_record(user_id, file_path, metadata)
        
        return {
            'file_id': file_id,
            'file_path': file_path,
            'metadata': metadata
        }
    
    @staticmethod
    def list_files(user_id: str):
        # Future log: Listing files for user
        return FileModel.get_user_files(user_id)

file_service = FileService() 
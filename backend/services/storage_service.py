from google.cloud import storage
from flask import current_app
from typing import BinaryIO, List, Optional
import os
from shared.utils.generate_id import generate_unique_id

class StorageService:
    def __init__(self):
        self.client = storage.Client()
        self.bucket = self.client.bucket(current_app.config['GCS_BUCKET'])
    
    def upload_file(self, file_obj: BinaryIO, user_id: str, filename: str) -> Optional[str]:
        # Future log: File upload attempt
        try:
            file_id = generate_unique_id('file_')
            destination_path = f"users/{user_id}/{file_id}/{filename}"
            blob = self.bucket.blob(destination_path)
            blob.upload_from_file(file_obj)
            return destination_path
        except Exception as e:
            # Future log: File upload failed
            return None
    
    def list_user_files(self, user_id: str) -> List[Dict[str, Any]]:
        # Future log: Listing user files
        try:
            prefix = f"users/{user_id}/"
            blobs = self.bucket.list_blobs(prefix=prefix)
            return [{
                'name': blob.name.split('/')[-1],
                'path': blob.name,
                'size': blob.size,
                'created': blob.time_created
            } for blob in blobs]
        except Exception as e:
            # Future log: File listing failed
            return []
    
    def download_file(self, file_path: str) -> Optional[bytes]:
        # Future log: File download attempt
        try:
            blob = self.bucket.blob(file_path)
            return blob.download_as_bytes()
        except Exception as e:
            # Future log: File download failed
            return None

storage_service = StorageService() 
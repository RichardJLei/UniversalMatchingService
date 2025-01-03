import openai
from flask import current_app
from services.storage_service import storage_service
from .models import ParseResultModel

class ParsingService:
    def __init__(self):
        openai.api_key = current_app.config['OPENAI_API_KEY']
    
    def parse_pdf(self, file_path: str, user_id: str) -> Dict[str, Any]:
        # Future log: Starting PDF parsing
        
        # Download file content
        pdf_content = storage_service.download_file(file_path)
        if not pdf_content:
            raise Exception("Failed to download file")
            
        # Use OpenAI to parse the PDF
        # This is a placeholder for the actual implementation
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Parse this PDF content into structured JSON"},
                {"role": "user", "content": pdf_content.decode('utf-8', errors='ignore')}
            ]
        )
        
        parsed_data = response.choices[0].message.content
        
        # Store the result
        result_id = ParseResultModel.create_parse_result(file_path, user_id, parsed_data)
        
        return {
            'result_id': result_id,
            'parsed_data': parsed_data
        }

parsing_service = ParsingService() 
from flask import Flask
from flask_cors import CORS
from config.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS
    CORS(app)
    
    # Future log: Application startup
    
    # Register blueprints
    from apps.file_management.routes import file_bp
    from apps.parsing.routes import parsing_bp
    from apps.comparison.routes import comparison_bp
    from apps.user_management.routes import user_bp
    
    app.register_blueprint(file_bp, url_prefix='/api/files')
    app.register_blueprint(parsing_bp, url_prefix='/api/parse')
    app.register_blueprint(comparison_bp, url_prefix='/api/compare')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=8080) 
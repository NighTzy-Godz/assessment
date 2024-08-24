from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
import cloudinary.api
from dotenv import load_dotenv
import os
from flask_migrate import Migrate


 
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///site.db')
app.config['WTF_CSRF_ENABLED'] = False 
db = SQLAlchemy(app)
migrate = Migrate(app, db)

CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)




from server.routes import userRoutes, itemRoutes

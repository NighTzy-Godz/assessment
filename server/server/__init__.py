from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
app.config['SECRET_KEY'] = 'Secret Key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['WTF_CSRF_ENABLED'] = False 
db = SQLAlchemy(app)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

from server.routes import userRoutes

from server import db, app
import jwt
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(20), nullable=False)
    pfp = db.Column(db.String(), default="https://res.cloudinary.com/doggodoggo228/image/upload/v1719548694/account_iu1nvc.png") 

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email,
            "pfp": self.pfp
        }
    
    def generate_auth_token(self):
        payload = {
            "id": self.id,
            "fullName": self.firstName + " " + self.lastName,
            "pfp": self.pfp
        }
        token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm="HS256")
        return token
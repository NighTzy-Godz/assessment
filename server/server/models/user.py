
from server import db

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
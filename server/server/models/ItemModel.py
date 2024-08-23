from server import db
from datetime import datetime
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    desc = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Float, nullable=False)
    img = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  

    def toDict(self):
        return {
            'id': self.id,
            'title': self.title,
            'desc': self.desc,
            'price': self.price,
            'img': self.img
        }
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField
from wtforms.validators import InputRequired, Length, NumberRange

class CreateItemForm(FlaskForm):
    title = StringField('Title', validators=[
        InputRequired(message='Title is required'),
        Length(min=2, max=100, message='Title must be between 2 and 100 characters')
    ])
    
    desc = TextAreaField('Description', validators=[
        InputRequired(message='Description is required'),
        Length(min=10, max=300, message='Description must be at least 10 characters long and 300 characters max')
    ])
    
    price = FloatField('Price', validators=[
        InputRequired(message='Price is required'),
        NumberRange(min=0, message='Price must be a positive number')
    ])
    
   
class EditItemForm(FlaskForm):
    title = StringField('Title', validators=[
        InputRequired(message='Title is required'),
        Length(min=2, max=100, message='Title must be between 2 and 100 characters')
    ])
    
    desc = TextAreaField('Description', validators=[
        InputRequired(message='Description is required'),
        Length(min=10, max=300, message='Description must be at least 10 characters long and 300 characters max')
    ])
    
    price = FloatField('Price', validators=[
        InputRequired(message='Price is required'),
        NumberRange(min=0, message='Price must be a positive number')
    ])
    
   

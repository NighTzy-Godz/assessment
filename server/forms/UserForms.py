from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, PasswordField
from wtforms.validators import InputRequired, Length, Email, EqualTo


class RegisterUserForm(FlaskForm):
    firstName = StringField('First Name', validators=[InputRequired(message='First Name is a required field'), Length(min=2, max=20, message='First Name should contain atleast 2 characters and maximum of 20 characters.')])
    lastName = StringField('Last Name', validators=[InputRequired(message='Last Name is a required field'), Length(min=2, max=20, message='Last Name should contain atleast 2 characters and maximum of 20 characters.')])
    email = EmailField('Email', validators=[InputRequired('Email is a required field'), Email('Email should be a type of email')])
    password = PasswordField('Password', validators=[InputRequired('Password is a required field'), Length(min=5, max=20, message='Password should be atleast 5 characters long and not exceed 20 characters'), EqualTo('confirmPass', message='Password and Confirm Password should match')])
    confirmPass = PasswordField('Confirm Password', validators=[InputRequired('Password is a required field'), Length(min=5, max=20, message='Confirm Password should be atleast 5 characters long and not exceed 20 characters')])
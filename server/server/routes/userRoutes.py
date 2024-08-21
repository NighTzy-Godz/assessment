from flask import jsonify
from server import app, db
from server.models.user import User
from server.forms.UserForms import RegisterUserForm
from werkzeug.security import generate_password_hash



@app.route('/api/registerUser',methods=['POST'])
def userRegisterRoute():
    form = RegisterUserForm()

    if not form.validate_on_submit():
        errors = {field: error for field, errors in form.errors.items() for error in errors}
        return jsonify(errors), 400

    existingUser = User.query.filter_by(email=form.email.data).first()
    if existingUser:
        return jsonify({"error":"Email already in use"}), 409

    hashed_pass = generate_password_hash(form.confirmPass.data)
    newUser = User(
        firstName=form.firstName.data,
        lastName=form.lastName.data,
        email=form.email.data,
        password = hashed_pass,
    )


    db.session.add(newUser)
    db.session.commit()


    return jsonify(newUser), 201
from flask import jsonify, request
from server import app, db
from server.models.UserModel import User
from server.forms.UserForms import RegisterUserForm, LoginUserForm
from werkzeug.security import generate_password_hash, check_password_hash



@app.route('/api/registerUser',methods=['POST'])
def userRegisterRoute():
  
    form = RegisterUserForm()

    if not form.validate_on_submit():
        first_error_message = next(iter(next(iter(form.errors.values()), [])))
        resBody = {"msg":first_error_message, "status":400}
        return jsonify(resBody), 400

    existingUser = User.query.filter_by(email=form.email.data).first()
    if existingUser:
        return jsonify({"msg":"Email already in use", "status":409}), 409 

    hashed_pass = generate_password_hash(form.confirmPass.data)
    newUser = User(
        firstName=form.firstName.data,
        lastName=form.lastName.data,
        email=form.email.data,
        password = hashed_pass,
    )


    # db.session.add(newUser)
    # db.session.commit()

    resBody = {"msg": f'Created the Account for {newUser.firstName} {newUser.lastName}!', "status":201 }
    return jsonify(resBody), 201

@app.route('/api/loginUser', methods=['POST'])
def loginRoute():
    form = LoginUserForm()
    if not form.validate_on_submit():
        errors = {field: error for field, errors in form.errors.items() for error in errors}
        return jsonify(errors), 400
    
    existingUser = User.query.filter_by(email=form.email.data).first()
    if not existingUser:
        return jsonify('User did not found'), 404
    
    validPassword = check_password_hash(existingUser.password, form.password.data)
    if not validPassword:
        return jsonify('Credentials did not match'), 400
    
    token = existingUser.generate_auth_token()

    return jsonify(token), 200


@app.route('/api/getItems')
def getItems():
    items  = [
        {"id":1, "name":'Aser'},
        {"id":1, "name":'James'},
    ]

    return jsonify(items)
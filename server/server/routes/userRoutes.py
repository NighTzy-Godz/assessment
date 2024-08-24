from flask import jsonify, request
from server import app, db
from server.models.UserModel import User
from server.forms.UserForms import RegisterUserForm, LoginUserForm
from werkzeug.security import generate_password_hash, check_password_hash



@app.route('/api/registerUser',methods=['POST', 'OPTIONS'])
def userRegisterRoute():
    try:
        if request.method == 'OPTIONS':
            response = jsonify({'message': 'CORS preflight request handled'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            return response
        
            
        form = RegisterUserForm()
        
        if not form.validate_on_submit():
            first_error_message = next(iter(next(iter(form.errors.values()), [])))
            resBody = {"msg":first_error_message, "status":400}
     
            return jsonify(resBody), 400

        existingUser = User.query.filter_by(email='a').first()
        print(existingUser, 'Line 30')
        if existingUser:
            return jsonify({"msg":"Email already in use", "status":409}), 409 

        hashed_pass = generate_password_hash('test123', salt_length=5)
        newUser = User(
           
            firstName=form.firstName.data,
            lastName=form.lastName.data,
            email=form.email.data,
            password = hashed_pass,
        )


        db.session.add(newUser)
        db.session.commit()

        resBody = {"msg": f'Created the Account for {newUser.firstName} {newUser.lastName}!', "status":201 }
        return jsonify(resBody), 201
    except Exception as e:
        print(e, "Error on exception")

@app.route('/api/loginUser', methods=['POST'])
def loginRoute():
    form = LoginUserForm()
    if not form.validate_on_submit():
        first_error_message = next(iter(next(iter(form.errors.values()), [])))
        resBody = {"msg":first_error_message, "status":400}
        return jsonify(resBody), 400
    
    existingUser = User.query.filter_by(email=form.email.data).first()
    if not existingUser:
         return jsonify({"msg":"User did not found", "status":404}), 404 
    
    validPassword = check_password_hash(existingUser.password, form.password.data)
    if not validPassword:
        return jsonify({"msg":"Credentials did not match", "status":400}), 400 
    
    token = existingUser.generate_auth_token()
    resBody = {"msg": 'Welcome back!', "data":token, "status":201 }
    return jsonify(resBody), 200
  


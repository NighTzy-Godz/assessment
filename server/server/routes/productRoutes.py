from flask import jsonify, request
from server.forms.ProductForms import CreateProductForm
from server import app,db, cloudinary
from server.models.ProductModel import Product

from functools import wraps
import jwt
 
def isAuth(f):
    @wraps(f)
    def func(*args, **kwargs):
        try:
            token = request.headers.get('x-auth-token')
            print(token)
            if not token:
                return jsonify({"msg": "Forbidden. You don't have a token to continue", "status": 403}), 403

           
            decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            request.user = decoded_token 

        except jwt.ExpiredSignatureError:
            return jsonify({"msg": "Token has expired", "status": 401}), 401
        except jwt.InvalidTokenError:
            return jsonify({"msg": "Invalid token", "status": 401}), 401

        return f(*args, **kwargs)  

    return func  

@app.route('/api/addProduct', methods=['POST'])
@isAuth
def addProduct():
    
    form = CreateProductForm()
  
    if not form.validate_on_submit():  
        first_error_message = next(iter(form.errors.values()))[0]
        resBody = {"msg":first_error_message, "status":400}
        return jsonify(resBody), 400
    
    img_file = request.files['img']
    if not img_file:
        resBody = {"msg":"Product Image is a required field", "status":400}
        return jsonify(resBody), 400

  
    img_upload = cloudinary.uploader.upload(img_file)
    
    newProduct = Product(
        title=form.title.data,
        desc=form.desc.data,
        price=form.price.data,
        img=img_upload['url']

    )

    db.session.add(newProduct)
    db.session.commit()

   
    resBody = {"msg": f'Created the Product {newProduct.title}!', "status":201 }
    return jsonify(resBody), 201
   
@app.route('/api/test')

def test():
    return 'Auth should fail'
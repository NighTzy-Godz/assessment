from flask import jsonify, request
from server.forms.ItemForms import CreateItemForm, EditItemForm
from server import app,db, cloudinary
from server.models.ItemModel import Item

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

@app.route('/api/items', methods=['POST'])
@isAuth
def addItems():
    try:

        form = CreateItemForm()
    
        if not form.validate_on_submit():  
            first_error_message = next(iter(form.errors.values()))[0]
            resBody = {"msg":first_error_message, "status":400}
            return jsonify(resBody), 400
        
        img_file = request.files['img']
        if not img_file:
            resBody = {"msg":"Product Image is a required field", "status":400}
            return jsonify(resBody), 400

    
        img_upload = cloudinary.uploader.upload(img_file)
        
        newProduct = Item(
            title=form.title.data,
            desc=form.desc.data,
            price=form.price.data,
            img=img_upload['url']

        )

        db.session.add(newProduct)
        db.session.commit()

    
        resBody = {"msg": f'Created the Product {newProduct.title}!', "status":201 }
        return jsonify(resBody), 201
    except Exception as e:
        print(e)
   

"""

// params id = This is the ID of the product that we're going to use to find the item and edit it afterwards.

"""

@app.route('/api/items/<int:id>', methods=['PUT'])
@isAuth
def editItem(id):
    try:

        foundItem = Item.query.get(id)
        if not foundItem:
            return jsonify({"msg": "Item did not found", "status": 404}), 404

        form = EditItemForm()

        if not form.validate_on_submit():
            first_error_message = next(iter(form.errors.values()))[0]
            return jsonify({"msg": first_error_message, "status": 400}), 400
        
        img_file = request.files['img']
        if not img_file:
            resBody = {"msg":"Product Image is a required field", "status":400}
            return jsonify(resBody), 400
        
        img_upload = cloudinary.uploader.upload(img_file)

        foundItem.title = form.title.data
        foundItem.desc = form.desc.data
        foundItem.price = form.price.data
        foundItem.img = img_upload['url']
        
        db.session.commit()

        resBody = {"msg": f'Updated the Product {foundItem.title}!', "status":201 }
        return jsonify(resBody), 201
    except Exception as e:
        print(e)
"""

// params id = This is the ID of the product that we're going to use for fetching the information of the specific item

"""
@app.route('/api/items/<int:id>')
def getItemDetails(id):
    try:
        foundItem = Item.query.get(id)
        if not foundItem:
            return jsonify({"msg": "Item did not found", "status": 404}), 404
        
        serializedItem = foundItem.toDict()
        return jsonify({"data": serializedItem, "status":201}), 201
    
    except Exception as e:
        print(e)

"""

// params id = This is the ID of the product that we're going to use for deleting the specific item

"""

@app.route('/api/items/<int:id>', methods=['DELETE'])
def deleteItem(id):
    try:
        item = Item.query.get(id)
        if not item:
            return jsonify({"msg": "Item not found", "status": 404}), 404

   
        db.session.delete(item)
        db.session.commit()

        return jsonify({"msg": "Item successfully deleted", "status": 200}), 200
    except Exception as e:
      print(e)
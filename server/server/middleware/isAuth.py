from functools import wraps
from flask import jsonify, request
import jwt
from server import app


def isAuth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            token = request.headers.get('x-auth-token')
            if not token:
                return jsonify({"msg": "Forbidden. You don't have a token to continue", "status": 403}), 403

           
            decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            request.user = decoded_token 

        except jwt.ExpiredSignatureError:
            return jsonify({"msg": "Token has expired", "status": 401}), 401
        except jwt.InvalidTokenError:
            return jsonify({"msg": "Invalid token", "status": 401}), 401

        return f(*args, **kwargs)  

    return decorated_function
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)


bcrypt = Bcrypt(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar info en el body'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'El campo email es requerido'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es requerido'}), 400
    if User.query.filter_by(email=body['email']).first() is not None:
        return jsonify({'msg': 'El email ya está registrado'}), 400
    
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_user = User()
    new_user.email = body['email']
    new_user.password = pw_hash
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.email)
    return jsonify({'msg': 'Nuevo usuario creado', 
                    'jwt-token': access_token}), 200

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    #se revisa si el usuario ha incluido campos en el body
    if body is None:
        return jsonify({'msg': 'Debe haber info en el body'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'El campo email es requerido'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es requerido'}), 400
    #obtenemos el registro dle usuario segun el email que envió
    user = User.query.filter_by(email = body['email']).first()
    if user is None:
        return jsonify({'msg': 'Usuario o contraseña inválido'}), 400
    #si existe el usuario comparar contraseña de la BD con la que escribe el usuario
    #si no coincide, devuelve error
    password_in_db = user.password
    pass_is_true = bcrypt.check_password_hash(password_in_db, body['password'])
    if pass_is_true is False:
        return jsonify({'msg': 'Usuario o contraseña inválido'}), 400
    #si todo ok, se crea el token
    access_token = create_access_token(identity=user.email)
    return jsonify({'msg': 'ok',
                        'jwt-token': access_token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def get_private_info():
    #traemos la info de registro del usuario
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify({'msg': 'Info para usario que inició sesión'}), 200
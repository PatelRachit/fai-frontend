from flask import Blueprint, jsonify, request
from controllers.demo import get_all_users, add_user

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    return jsonify(get_all_users())

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.json
    if not data.get('name') or not data.get('email'):
        return jsonify({"error": "Missing name or email"}), 400
    return jsonify(add_user(data['name'], data['email']))

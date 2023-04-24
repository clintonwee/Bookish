from flask import request, jsonify
from bookish.models.example import User
from bookish.models import db
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager


def user_routes(app):

    @app.route('/login', methods=['POST'])
    def login():
        if request.method == 'POST':
            if request.is_json:
                data = request.get_json()
                email = data['email']
                password = data['password']

                user = User.query.filter_by(email=email).first()
                if user.password == password:
                    access_token = create_access_token(identity=email)
                    return {"status": "success", "message": "Login completed", "access_token":access_token}
                else:
                    return {"status": "error", "message": "Incorrect password given"}

            else:
                return {"error": "The request payload is not in JSON format"}

    @app.route("/logout", methods=['POST'])
    @jwt_required()
    def logout():
        response = jsonify({"status": "success", "redirect": "/login"})
        unset_jwt_cookies(response)
        return response

    @app.route('/profile', methods=['GET'])
    @jwt_required()
    def my_profile():
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        print(user)
        response_body = {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "isAdmin": user.isAdmin
        }
        return response_body

    @app.route('/users', methods=['GET'])
    @jwt_required()
    def get_all_users():
        if request.method == 'GET':
            all_users = User.query.all()
            results = [
                {
                    'id': user.id,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'age': user.age,
                    'email': user.email
                } for user in all_users]
            return {"users": results}

    @app.route('/user/<id>', methods=['GET'])
    @jwt_required()
    def get_user(id):
        if request.method == 'GET':
            user = User.query.get(id)
            loans = [
                {
                    'title': loan.title,
                    'author': loan.author,
                    'due_date': loan.due_date
                } for loan in user.loans
            ]
            result = {
                    'id': user.id,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'age': user.age,
                    'email': user.email,
                    'loans': loans
                }
            return {"user": result}

    @app.route('/user', methods=['POST'])
    def create_user():
        if request.method == 'POST':
            if request.is_json:
                data = request.get_json()
                new_user = User(first_name=data['first_name'], last_name=data['last_name'], age=data['age'], email=data['email'], password=data['password'], isAdmin=data['isAdmin'])
                db.session.add(new_user)
                db.session.commit()
                return {"status": "success", "message": "New User has been created successfully."}
            else:
                return {"status": "error", "message": "The request payload is not in JSON format"}

    @app.route('/user/<id>', methods=['PUT'])
    @jwt_required()
    def update_user(id):
        if request.method == 'PUT':
            if request.is_json:
                data = request.get_json()
                user = User.query.get(id)
                user.first_name = data['first_name']
                user.last_name = data['last_name']
                user.age = data['age']
                user.email = data['email']

                db.session.commit()
                return {"message": "Book has been edited successsfully."}
            else:
                return {"error": "The request payload is not in JSON format"}

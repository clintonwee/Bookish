from flask import request
from bookish.models.example import Book, User
from bookish.models import db


def user_routes(app):

    @app.route('/users', methods=['GET'])
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
                new_user = User(first_name=data['first_name'], last_name=data['last_name'], age=data['age'], email=data['email'])
                db.session.add(new_user)
                db.session.commit()
                return {"message": "New User has been created successfully."}
            else:
                return {"error": "The request payload is not in JSON format"}

    @app.route('/user/<id>', methods=['PUT'])
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

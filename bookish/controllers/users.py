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
            book = Book.query.get(id)
            result = {
                    'id': book.id,
                    'title': book.title,
                    'author': book.author,
                    'isbn': book.isbn,
                    'genre': book.genre,
                    'total': book.total,
                    'available':book.available
                }
            return {"book": result}

    @app.route('/user', methods=['POST'])
    def create_user():
        if request.method == 'POST':
            if request.is_json:
                data = request.get_json()
                new_book = Book(title=data['title'], author=data['author'], genre=data['genre'], isbn=data['isbn'], total=data['total'], available=data['available'])
                db.session.add(new_book)
                db.session.commit()
                return {"message": "New book has been created successfully."}
            else:
                return {"error": "The request payload is not in JSON format"}

    @app.route('/user/<id>', methods=['PUT'])
    def update_user(id):
        if request.method == 'PUT':
            if request.is_json:
                data = request.get_json()
                book = Book.query.get(id)
                book.title = data['title']
                book.author = data['author']
                book.genre = data['genre']
                book.isbn = data['isbn']
                book.total = data['total']
                book.available = data['available']

                db.session.commit()
                return {"message": "Book has been edited successsfully."}
            else:
                return {"error": "The request payload is not in JSON format"}

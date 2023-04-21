from flask import request
from bookish.models.example import Book
from bookish.models import db


def bookish_routes(app):
    @app.route('/healthcheck')
    def health_check():
        return {"status": "OK"}

    @app.route('/books', methods=['GET'])
    def get_all_books():
        if request.method == 'GET':
            all_books = Book.query.all()
            results = [
                {
                    'id': book.id,
                    'title': book.title,
                    'author': book.author,
                    'isbn': book.isbn,
                    'genre': book.genre,
                    'total': book.total,
                    'available':book.available
                } for book in all_books]
            return {"books": results}

    @app.route('/book/<id>', methods=['GET'])
    def get_book(id):
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

    @app.route('/book', methods=['POST'])
    def create_book():
        if request.method == 'POST':
            if request.is_json:
                data = request.get_json()
                new_book = Book(title=data['title'], author=data['author'], genre=data['genre'], isbn=data['isbn'], total=data['total'], available=data['available'])
                db.session.add(new_book)
                db.session.commit()
                return {"message": "New book has been created successfully."}
            else:
                return {"error": "The request payload is not in JSON format"}

    @app.route('/example', methods=['POST', 'GET'])
    def handle_example():
        if request.method == 'POST':
            if request.is_json:
                data = request.get_json()
                new_book = Book(title=data['title'], author=data['author'], genre=data['genre'], isbn=data['isbn'])
                db.session.add(new_book)
                db.session.commit()
                return {"message": "New example has been created successfully."}
            else:
                return {"error": "The request payload is not in JSON format"}

        elif request.method == 'GET':
            examples = Book.query.all()
            results = [
                {
                    'id': example.id,
                    'data1': example.data1,
                    'data2': example.data2
                } for example in examples]
            return {"examples": results}

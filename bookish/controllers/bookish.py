from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from bookish.models.example import Book, User
from bookish.models import db
from flask_login import login_required

def bookish_routes(app):
    @app.route('/healthcheck')
    def health_check():
        return {"status": "OK"}

    @app.route('/books', methods=['GET'])
    @jwt_required()
    def get_all_books():
        if request.method == 'GET':
            args = request.args
            search_param = args.get("search")

            print(search_param)
            all_books = None
            if search_param:
                print("Filtering by params")
                all_books = db.paginate(db.select(Book).filter(Book.title.ilike('%{}%'.format(search_param)) | Book.author.ilike('%{}%'.format(search_param))).order_by(Book.title))
                # all_books = db.paginate(Book.query.filter(Book.title.ilike('%{}%'.format(search_param)) | Book.author.ilike('%{}%'.format(search_param))))
            else:
                print("Query all")
                all_books = db.paginate(db.select(Book).order_by(Book.title))

            print(all_books.total)
            results = [
                {
                    'id': book.id,
                    'title': book.title,
                    'author': book.author,
                    'isbn': book.isbn,
                    'genre': book.genre,
                    'total': book.total,
                    'available': book.available
                } for book in all_books]
            return {"books": results ,"total": all_books.total}

    @app.route('/book/<id>', methods=['GET'])
    @jwt_required()
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
    @jwt_required()
    def create_book():
        if request.method == 'POST':
            email = get_jwt_identity()
            user = User.query.filter_by(email=email).first()
            if user.isAdmin:
                data = request.get_json()
                new_book = Book(title=data['title'], author=data['author'], genre=data['genre'], isbn=data['isbn'], total=data['total'], available=data['available'])
                db.session.add(new_book)
                db.session.commit()
                return {"status": "success", "message": "New book has been created successfully."}
            else:
                return {"status": "error", "message": "You are not authorized to create books"}

    @app.route('/book/<id>', methods=['PUT'])
    @jwt_required()
    def update_book(id):
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

    @app.route('/example', methods=['POST', 'GET'])
    @jwt_required()
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

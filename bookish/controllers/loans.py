from flask import request
from flask_jwt_extended import jwt_required
from bookish.models.example import Book, User, Loan
from bookish.models import db
from datetime import timedelta, date


def loan_routes(app):
    @app.route('/loan', methods=['POST'])
    @jwt_required()
    def create_loan():
        if request.method == 'POST':
            if request.is_json:
                data = request.get_json()
                due_date = date.today() + timedelta(days=14)
                user = User.query.get(data['user_id'])
                book = Book.query.get(data['book_id'])

                if book.available == 0:
                    return {
                        "status": "failed",
                        "message": "No books available"
                    }
                else:
                    book.available -= 1
                    db.session.add(Loan(user_id=user.id, book_id=book.id, due_date=date.today()))
                    db.session.commit()
                    return {"message": "New Loan has been created successfully."}
            else:
                return {"status": "error", "message": "The request payload is not in JSON format"}

    @app.route('/loan/return', methods=['POST'])
    @jwt_required()
    def delete_loan(loan_id):
        if request.method == 'POST':
            loan = Loan.query.get(loan_id)
            book_id = loan.book_id
            book = Book.query.get(book_id)
            book.available += 1

            db.session.delete(loan)
            db.session.commit()
            return {"status": "success", "message": "Book has been returned"}

    @app.route('/loan/book/<book_id>', methods=['GET'])
    @jwt_required()
    def view_loan_by_book(book_id):
        if request.method == 'GET':
            book = Book.query.get(book_id)
            loans = book.users
            return [{
                "first_name": loan.user.first_name,
                "last_name": loan.user.last_name,
                "id": loan.id,
                "book_id": loan.book_id,
                "title": loan.book.title,
                "author": loan.book.author,
                "genre": loan.book.genre,
                "isbn": loan.book.isbn,
                "due_date": loan.due_date.isoformat()
            } for loan in loans]

        else:
            return {"status": "error", "message": "The request payload is not in JSON format"}

    @app.route('/loan/user/<user_id>', methods=['GET'])
    @jwt_required()
    def view_loan_by_user(user_id):
        if request.method == 'GET':
            user = User.query.get(user_id)
            loans = user.books
            return [{
                "id": loan.id,
                "book_id": loan.book_id,
                "title": loan.book.title,
                "author": loan.book.author,
                "genre": loan.book.genre,
                "isbn": loan.book.isbn,
                "due_date": loan.due_date.isoformat()
            } for loan in loans]

        else:
            return {"error": "The request payload is not in JSON format"}
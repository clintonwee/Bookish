from flask import request
from bookish.models.example import Book, User
from bookish.models import db
from datetime import timedelta, date

def loan_routes(app):

    @app.route('/loan', methods=['POST'])
    def create_loan():
        if request.method == 'POST':
            if request.is_json:
                data = request.get_json()
                due_date = date.today() + timedelta(days=14)
                # new_loan = book_loan.insert().values(
                #     user_id=data['user_id'],
                #     book_id=data['book_id'],
                #     due_date=due_date
                # )
                # db.session.execute(new_loan)
                db.session.commit()
                return {"message": "New Loan has been created successfully."}
            else:
                return {"error": "The request payload is not in JSON format"}

    @app.route('/loan/book/<book_id>', methods=['GET'])
    def view_loan_by_book(book_id):
        if request.method == 'GET':
            query = Book.query.join(User, Book.user)
            all_loans = query.order_by().all()
            print(all_loans)
            return {"message": "New Loan has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

from bookish.app import db
from flask_login import UserMixin
# book_loan = db.Table('book_loan',
#                      db.Column('book_id', db.Integer, db.ForeignKey('book.id')),
#                      db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
#                      db.Column('due_date', db.Date)
#                      )

class Book(db.Model):
    # This sets the name of the table in the database
    __tablename__ = 'books'


    # Here we outline what columns we want in our database
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    author = db.Column(db.String())
    genre = db.Column(db.String())
    isbn = db.Column(db.String())
    total = db.Column(db.Integer)
    available = db.Column(db.Integer)
    users = db.relationship("Loan", back_populates="book")

    def __init__(self, title, author, genre, isbn, total, available):
        self.title = title
        self.author = author
        self.genre = genre
        self.isbn = isbn
        self.total = total
        self.available = available

    def __repr__(self):
        return '<id {}, title {}>'.format(self.id, self.title)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'genre': self.genre,
            'isbn': self.isbn,
            'total': self.total,
            'available': self.available
        }


class User(db.Model, UserMixin):
    # This sets the name of the table in the database
    __tablename__ = 'users'

    # Here we outline what columns we want in our database
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())
    age = db.Column(db.Integer)
    email = db.Column(db.String())
    books = db.relationship('Loan', back_populates="user")
    password = db.Column(db.String())
    isAdmin = db.Column(db.Boolean)

    def __init__(self, first_name, last_name, age, email, password, isAdmin):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.email = email
        self.password = password
        self.isAdmin = isAdmin

    def __repr__(self):
        return '<id {}, name {} {}>'.format(self.id, self.first_name, self.last_name)

    def serialize(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'age': self.age,
            'email': self.email
        }

class Loan(db.Model):
    # This sets the name of the table in the database
    __tablename__ = 'loans'

    # Here we outline what columns we want in our database
    id = db.Column(db.Integer, primary_key=True)

    book_id = db.Column(db.Integer, db.ForeignKey("books.id"))
    book = db.relationship("Book", back_populates="users")

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", back_populates="books")

    due_date = db.Column(db.Date)

    def __init__(self, book_id, user_id, due_date):
        self.book_id = book_id,
        self.user_id = user_id,
        self.due_date = due_date

    def __repr__(self):
        return '<id {}, book: {} on loan to user: {}>'.format(self.id, self.book.title, self.user.first_name)

    def serialize(self):
        return {
            # 'id': self.id,
            # 'first_name': self.first_name,
            # 'last_name': self.last_name,
            # 'age': self.age,
            # 'email': self.email
        }
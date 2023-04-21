from bookish.app import db

book_loan = db.Table('book_loan',
                     db.Column('book_id', db.Integer, db.ForeignKey('book.id')),
                     db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
                     )
class Book(db.Model):
    # This sets the name of the table in the database
    __tablename__ = 'Books'

    # Here we outline what columns we want in our database
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    author = db.Column(db.String())
    genre = db.Column(db.String())
    isbn = db.Column(db.String())
    total = db.Column(db.Integer)
    available = db.Column(db.Integer)

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


class User(db.Model):
    # This sets the name of the table in the database
    __tablename__ = 'Users'

    # Here we outline what columns we want in our database
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())
    age = db.Column(db.Integer)
    email = db.Column(db.String())
    loans = db.relationship('Book', secondary=book_loan, backref="users")

    def __init__(self, first_name, last_name, age, email):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.email = email

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

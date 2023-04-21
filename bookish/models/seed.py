__version__ = "0.1.0"
from __init__ import db
from example import Book, User

db.drop_all()
db.create_all()

Book1 = Book(title="Harry Potter", author="Rowling", isbn="1111", genre="Horror", total=10, borrowed=0)
Book2 = Book(title="Naruto", author="Sasuke", isbn="2222", genre="Children", total=8, borrowed=0)
Book3 = Book(title="Sherlock Holmes", author="Sherlock Holmes", isbn="2222", genre="Romance", total=2, borrowed=0)

User1 = User(first_name="Hannah", last_name="Leong", age=55, email="hannah@gmail.com")
User2 = User(first_name="Henry", last_name="Riddall", age=2, email="henry@gmail.com")

db.session.add_all([Book1, Book2, Book3])
db.session.add_all([User1, User2])

db.session.commit()
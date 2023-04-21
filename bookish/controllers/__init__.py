from bookish.controllers.bookish import bookish_routes
from bookish.controllers.users import user_routes
from bookish.controllers.loans import loan_routes
def register_controllers(app):
    bookish_routes(app)
    user_routes(app)
    loan_routes(app)


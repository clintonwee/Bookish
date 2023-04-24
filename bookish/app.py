import os
from flask import Flask
from bookish.models import db, migrate
from bookish.controllers import register_controllers
from flask_login import LoginManager
from bookish.models.example import User

def create_app():
    app = Flask(__name__)

    app.config.from_object(os.environ['APP_SETTINGS'])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    login_manager = LoginManager()

    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    migrate.init_app(app, db)

    register_controllers(app)

    if __name__ == "__main__":
        app.run()

    return app

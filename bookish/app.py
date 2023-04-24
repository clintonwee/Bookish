import os
from datetime import datetime, timedelta, timezone
import json
from flask import Flask
from bookish.models import db, migrate
from bookish.controllers import register_controllers
from flask_login import LoginManager
from bookish.models.example import User
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager

def create_app():
    app = Flask(__name__)

    app.config.from_object(os.environ['APP_SETTINGS'])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    jwt = JWTManager(app)
    db.init_app(app)
    app.config["JWT_SECRET_KEY"] = os.environ['JWT_SECRET_KEY']
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                data = response.get_json()
                if type(data) is dict:
                    data["access_token"] = access_token
                    response.data = json.dumps(data)
            return response
        except (RuntimeError, KeyError):
            # Case where there is not a valid JWT. Just return the original respone
            return response
    # login_manager = LoginManager()
    #
    # login_manager.init_app(app)
    #
    # @login_manager.user_loader
    # def load_user(user_id):
    #     return User.query.get(user_id)

    migrate.init_app(app, db)

    register_controllers(app)

    if __name__ == "__main__":
        app.run()

    return app

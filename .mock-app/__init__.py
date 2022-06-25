from flask import Flask, render_template, redirect
from .config import Configuration
from .models import db, User, Server, server_users, Channel, ChannelMessage, DirectMessage, Friends
from flask_migrate import Migrate
from .mock_routes.channel import channel_routes
from .mock_routes.friends import friends_routes
from .mock_routes.inbox import inbox_routes
from .mock_routes.search import search_routes
from .mock_routes.server import server_routes
from .mock_routes.users import users_routes

# * Initialise the app to connect with our env variables
app = Flask(__name__)
app.config.from_object(Configuration)

db.init_app(app)
Migrate(app, db)

# * Blueprints underneath
app.register_blueprint(channel_routes)
app.register_blueprint(friends_routes)
app.register_blueprint(inbox_routes)
app.register_blueprint(search_routes)
app.register_blueprint(server_routes)
app.register_blueprint(users_routes)

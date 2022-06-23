from flask import Flask, render_template, redirect
from .config import Configuration
from .models import db
from flask_migrate import Migrate

# Initialise the app to connect with our env variables
app = Flask(__name__)
app.config.from_object(Configuration)

db.init_app(app)
Migrate(app, db)
# Blueprints underneath

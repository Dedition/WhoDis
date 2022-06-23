from flask import Flask, render_template, redirect
from .config import Configuration

# Initialise the app to connect with our env variables
app = Flask(__name__)
app.config.from_object(Configuration)

# Blueprints underneath

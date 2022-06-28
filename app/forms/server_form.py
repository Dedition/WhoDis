from xmlrpc.client import DateTime
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SubmitField, DateField
from wtforms.validators import DataRequired, ValidationError
from datetime import datetime

def name_length(form, field):
    name = field.data
    if len(name) > 50:
        raise ValidationError(
            'Name is too long! Please make it 50 characters or less.')


class ServerForm(FlaskForm):
    name = StringField('name', validators=[
                       DataRequired(), name_length])
    banner_url = StringField('banner_url', validators=[DataRequired()])
    server_icon_url = StringField(
        'server_icon_url', validators=[DataRequired()])
    dm_channel = BooleanField('dm_channel')
    public = BooleanField('public')
    owner_id = IntegerField('owner_id')
    created_at = DateField('created_at')
    updated_at = DateField('updated_at')
    # submit = SubmitField('Submit')

from wsgiref import validate
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from ..models import Server


def name_length(form, field):
    name = field.data
    if len(name) > 50:
        raise ValidationError(
            'Name is too long! Please make it 50 characters or less.')


class ServerForm(FlaskForm):
    name = StringField('Server Name', validators=[
                       DataRequired(), name_length])
    banner_url = StringField('Banner Url', validators=[DataRequired()])
    server_icon_url = StringField(
        'Server Icon Url', validators=[DataRequired()])
    dm_channel = BooleanField('DM Channel', validators=[DataRequired()])
    public = BooleanField('Public', validators=[DataRequired()])
    # submit = SubmitField('Submit')

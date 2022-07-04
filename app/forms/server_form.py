from flask_wtf import FlaskForm
from wtforms import StringField, FileField, DateField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileAllowed


def name_length(form, field):
    name = field.data
    if len(name) > 50:
        raise ValidationError(
            'Name is too long! Please make it 50 characters or less.')


class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), name_length])
    banner_url = FileField('banner_url', validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif', 'img', 'tiff'])])
    server_icon_url = FileField('server_icon_url', validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif', 'img', 'tiff'])])
    dm_channel = BooleanField('dm_channel')
    public = BooleanField('public')
    owner_id = IntegerField('owner_id')
    created_at = DateField('created_at')
    updated_at = DateField('updated_at')
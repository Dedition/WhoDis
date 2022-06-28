from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def name_length(form, field):
    name = field.data
    if len(name) > 50:
        raise ValidationError(
            'Name is too long! Please make it 50 characters or less.')


class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])

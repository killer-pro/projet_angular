from django.core.exceptions import  ValidationError
import re

def validate_senegalease_phone_number(value):
    if not re.match(r'^(\+?221)?\d{9}$',value):
        raise ValidationError('ce numero n\'est pas correct entrer un numero senegalais(+221771234567 ou 771234567)')
    
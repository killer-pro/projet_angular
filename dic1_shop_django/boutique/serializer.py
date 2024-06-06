from rest_framework import serializers
from .models import Produit,Categorie,Articles
from boutique.models import MyUser

class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = '__all__'

class ArticlesSerializer(serializers.ModelSerializer):
    article = ProduitSerializer()

    class Meta:
        model = Articles
        fields = ['article', 'nombre']

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields="__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'password',"username", 'email','prenom','nom', 'date_naissance']
        extra_kwargs = {'password': {'write_only': True}}

from rest_framework import serializers
from .models import MyUser

class UserFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = [
            "username",
            "first_name",
            "last_name",
            "profile",
            "email",
            "email2",
            "telephone",
            "addresse",
            "date_naissance",
            "pays",
            "region",
            "code_postale",
            "commande_attente",
            "commande_terminer",
            "panier",
        ]
        extra_kwargs = {field: {'required': False} for field in fields}

from rest_framework import serializers
from .models import Produit,Categorie
from boutique.models import MyUser

class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = '__all__'
        
class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields="__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'password',"username", 'email','prenom','nom', 'date_naissance']
        extra_kwargs = {'password': {'write_only': True}}
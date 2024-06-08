from rest_framework import serializers,generics
from .models import Produit,Categorie,Articles
from boutique.models import MyUser


class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = '__all__'

class ArticlesSerializer(serializers.ModelSerializer):
    article_detail = ProduitSerializer(source='article', read_only=True)
    article = serializers.PrimaryKeyRelatedField(queryset=Produit.objects.all())

    class Meta:
        model = Articles
        fields = ['id', 'article', 'article_detail', 'client', 'nombre']
        extra_kwargs = {'client': {'read_only': True}}


class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields="__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'password',"username", 'email','prenom','nom', 'date_naissance']
        extra_kwargs = {'password': {'write_only': True}}

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

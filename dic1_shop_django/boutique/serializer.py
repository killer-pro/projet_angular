from rest_framework import serializers
from .models import Produit,Categorie

class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = '__all__'
        
class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields="__all__"
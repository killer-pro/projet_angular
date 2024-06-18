from rest_framework import serializers,generics
from .models import Produit,Categorie,Articles
from boutique.models import MyUser
from django.contrib.auth.password_validation import validate_password


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
        fields = ['id', 'password',"username", 'email','first_name','last_name','prenom','nom', 'date_naissance']
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





class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])

    def validate(self, attrs):
        user = self.context['request'].user
        if not user.check_password(attrs['old_password']):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance
from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models
from boutique.validators import validate_senegalease_phone_number

# Manager personnalisé pour MyUser
class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

# Modèle utilisateur personnalisé
class MyUser(AbstractUser):
    profile = models.ImageField(upload_to='static/assets/profile/', null=True, default='static/assets/image/image_1.png')
    email = models.EmailField(unique=True)
    email2 = models.EmailField(max_length=100, null=True, unique=True)
    telephone = models.CharField(max_length=50, null=True, validators=[validate_senegalease_phone_number])
    prenom = models.CharField(max_length=200, null=True)
    nom = models.CharField(max_length=200, null=True)
    addresse = models.CharField(max_length=200, null=True)
    date_naissance = models.DateField(null=True)
    pays = models.CharField(max_length=200, null=True)
    region = models.CharField(max_length=200, null=True)
    code_postale = models.CharField(max_length=200, null=True)
    commande_attente = models.IntegerField(null=True, default=10)
    commande_terminer = models.IntegerField(null=True, default=100)
    panier = models.ManyToManyField('Articles', related_name='panier', blank=True)

    groups = models.ManyToManyField(Group, related_name='myuser_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='myuser_set', blank=True)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [email]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# Modèle Produit
class Produit(models.Model):
    id = models.AutoField(primary_key=True)
    modele = models.CharField(max_length=100, null=True)
    marque = models.CharField(max_length=100, null=True)
    description = models.TextField(max_length=1000, null=True)
    categorie = models.CharField(max_length=100, null=True)
    prix = models.FloatField(null=True)
    quantite = models.IntegerField(null=True)
    etoile = models.IntegerField(null=True)
    image = models.ImageField(upload_to='static/assets/image/', null=True)
    
    def __str__(self):
        return self.modele

# Modèle Articles
class Articles(models.Model):
    id = models.AutoField(primary_key=True)
    article = models.OneToOneField(Produit, on_delete=models.CASCADE, null=True)
    nombre = models.IntegerField(null=True)
    mail = models.EmailField(max_length=254, null=True)
    
    def __str__(self):
        return f"{self.nombre} {self.article}"

# Modèle Categorie
class Categorie(models.Model):
    nom_categorie = models.CharField(max_length=200, null=True)
    
    def __str__(self):
        return self.nom_categorie

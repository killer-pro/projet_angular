from rest_framework import generics
from .models import Produit, Categorie
from .serializer import ProduitSerializer, CategorieSerializer
from rest_framework.permissions import AllowAny

class ProduitsView(generics.ListAPIView):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer
    permission_classes=[AllowAny]

class ProduitView(generics.ListAPIView):
    serializer_class = ProduitSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        id = self.kwargs['id']
        return Produit.objects.filter(id=id)

class CategorieView(generics.ListAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
    permission_classes=[AllowAny]
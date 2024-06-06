from rest_framework import generics
from .models import Produit, Categorie,Articles
from .serializer import ProduitSerializer, CategorieSerializer,ArticlesSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated

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

class PanierView(generics.ListAPIView):
    serializer_class = ArticlesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Articles.objects.filter(client=user)
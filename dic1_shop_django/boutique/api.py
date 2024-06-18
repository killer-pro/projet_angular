from rest_framework import generics,status
from .models import Produit, Categorie,Articles
from .serializer import ProduitSerializer, CategorieSerializer,ArticlesSerializer,ChangePasswordSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q

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

# class PanierView(generics.ListAPIView):
#     serializer_class = ArticlesSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Articles.objects.filter(client=user)
    
# class AddToPanierView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         serializer = ArticlesSerializer(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)



class RechercheView(generics.ListAPIView):
    serializer_class = ProduitSerializer

    def get_queryset(self):
        terme_recherche = self.kwargs['search']
        return Produit.objects.filter(
                    Q(modele__icontains=terme_recherche) |
                    Q(marque__icontains=terme_recherche) |
                    Q(description__icontains=terme_recherche) |
                    Q(categorie__icontains=terme_recherche)
                )





class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.update(request.user, serializer.validated_data)
            return Response({"detail": "Password has been changed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
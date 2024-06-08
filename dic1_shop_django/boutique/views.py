from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status,viewsets,generics
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializer import UserSerializer, UserFullSerializer,ArticlesSerializer
from .models import MyUser,Articles
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.hashers import check_password


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = MyUser.objects.get(email=request.data['email'])
        user.set_password(request.data['password'])
        user.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': UserSerializer(user).data}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def get_user(request):
    user = request.user
    if request.method == 'GET':
        serializer = UserFullSerializer(user)
        return Response(serializer.data)
    elif request.method in ['PUT', 'PATCH']:
        serializer = UserFullSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    data = request.data
    if not check_password(data['previous_password'], user.password):
        return Response({'error': 'Incorrect previous password'}, status=status.HTTP_400_BAD_REQUEST)
    if data['new_password'] != data['confirm_password']:
        return Response({'error': 'New passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
    user.set_password(data['new_password'])
    user.save()
    return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    serializer = UserFullSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# panier
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_panier(request):
#     user = request.user
#     panier_items = Articles.objects.filter(client=user)
#     serializer = ArticlesSerializer(panier_items, many=True)
#     return Response(serializer.data)

class PanierListCreateView(generics.ListCreateAPIView):
    serializer_class = ArticlesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Articles.objects.filter(client=self.request.user)

    def perform_create(self, serializer):
        # Récupérer les données de l'article à ajouter
        article_data = serializer.validated_data

        # Vérifier si l'article est déjà présent dans le panier de l'utilisateur
        existing_article = Articles.objects.filter(client=self.request.user, article=article_data['article']).first()

        if existing_article:
            # Si l'article existe déjà, mettre à jour la quantité en incrémentant le nombre d'articles
            existing_article.nombre += article_data['nombre']
            existing_article.save()
            serializer.instance = existing_article
        else:
            # Sinon, ajouter le nouvel article au panier
            serializer.save(client=self.request.user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    

class PanierItemDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticlesSerializer
    permission_classes = [IsAuthenticated]
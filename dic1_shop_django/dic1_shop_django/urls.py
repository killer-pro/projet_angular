from django.contrib import admin
from django.urls import path, include ,re_path
from boutique import api
from boutique import views
from rest_auth.views import LoginView, LogoutView
# from boutique.views import CustomLoginView
urlpatterns = [
    path("produit_item/<int:id>/", api.ProduitView.as_view(), name="produit_item"), 
    path("api-auth/", include("rest_framework.urls")),
    path("produits/", api.ProduitsView.as_view(), name="produit-list-create"),
    path("categories/", api.CategorieView.as_view(), name="categorie-list-create"),
    path('rest-auth/login/', LoginView.as_view(), name='rest_login'),
    path('rest-auth/logout/', LogoutView.as_view(), name='rest_logout'),
    # path('rest-auth/', include('dj_rest_auth.urls')),  # Inclus les URLs de base de dj-rest-auth
    # path('rest-auth/registration/', include('dj_rest_auth.registration.urls')),  # Inclus les URLs d'enregistrement de dj-rest-auth
    path('user/', views.get_user, name='get_user'),  
    path('login/',views.login),
    path('signup/',views.signup),
    path('test_token/',views.test_token),
    path("admin/", admin.site.urls),    

]

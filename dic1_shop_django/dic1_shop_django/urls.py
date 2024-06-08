from django.contrib import admin
from django.urls import path, include
from boutique import api, views
from rest_auth.views import LoginView, LogoutView

urlpatterns = [
    path("produit_item/<int:id>/", api.ProduitView.as_view(), name="produit_item"), 
    path("api-auth/", include("rest_framework.urls")),
    path("produits/", api.ProduitsView.as_view(), name="produit-list-create"),

    path("categories/", api.CategorieView.as_view(), name="categorie-list-create"),
    path('rest-auth/login/', LoginView.as_view(), name='rest_login'),
    path('rest-auth/logout/', LogoutView.as_view(), name='rest_logout'),
    path('user/', views.get_user, name='get_user'),
    path('update/', views.update_user, name='user-update'),

    path('user/change-password/', views.change_password, name='change_password'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('test_token/', views.test_token, name='test_token'),
    
    path('panier/', views.PanierListCreateView.as_view(), name='panier-list-create'),
    path('panier/<int:pk>/', views.PanierItemDestroyView.as_view(), name='panier-item-detail-delete'),

    path('recherche/<str:search>/', api.RechercheView.as_view(), name='recherche'),

    path("admin/", admin.site.urls),

    
]

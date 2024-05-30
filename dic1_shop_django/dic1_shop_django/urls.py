"""
URL configuration for dic1_shop_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from boutique import api

urlpatterns = [
    path("produit_item/<int:id>/",api.ProduitView.as_view(),name="produit_item"), 
    path("rest-auth/", include("rest_framework.urls")),
    path("produits/", api.ProduitsView.as_view(), name="produit-list-create"),
    path("categories/", api.CategorieView.as_view(), name="categorie-list-create"),
    path("rest-auth/", include('rest_auth.urls')),
    path("rest-auth/registration/", include('rest_auth.registration.urls')),
    path("admin/", admin.site.urls),    
    path("", admin.site.urls),    

]

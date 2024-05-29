from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import  MyUser,Produit, Categorie ,Articles

class MyUserAdmin(UserAdmin):
    model = MyUser
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'groups')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'profile', 'email2', 'telephone', 'addresse', 'date_naissance', 'pays', 'region', 'code_postale')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('email',)

admin.site.register(Produit)
admin.site.register(Categorie)
admin.site.register(MyUser, MyUserAdmin)
admin.site.register(Articles)

from django.contrib.auth.models import AbstractBaseUser
from django.db import models
import uuid

class User(AbstractBaseUser):
     username = None
     password = None
 
     id = models.CharField(primary_key=True, max_length=36)
     name = models.CharField(max_length=255, blank=True)
     email = models.EmailField(unique=True)
     email_verified = models.BooleanField(default=False)
     image = models.URLField(null=True, blank=True)
     created_at = models.DateTimeField(auto_now_add=True)
     updated_at = models.DateTimeField(auto_now=True)
 
     USERNAME_FIELD = "email"
     REQUIRED_FIELDS = []
 
     class Meta:
         db_table = "users"
         verbose_name = "user"
         verbose_name_plural = "users"
 
     def __str__(self) -> str:
         return self.name
     

class Session(models.Model):
     id = models.CharField(primary_key=True, max_length=36)
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     token = models.CharField(max_length=255)
     expires_at = models.DateTimeField()
     ip_address = models.CharField(max_length=255, null=True)
     user_agent = models.CharField(max_length=255, null=True)
     created_at = models.DateTimeField(auto_now_add=True)
     updated_at = models.DateTimeField(auto_now=True)
 
     class Meta:
         db_table = "sessions"
 
 
class Account(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_id = models.CharField(max_length=255)
    provider_id = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255, null=True)
    refresh_token = models.CharField(max_length=255, null=True)
    access_token_expires_at = models.DateTimeField(null=True)
    refresh_token_expires_at = models.DateTimeField(null=True)
    scope = models.CharField(max_length=255, null=True)
    id_token = models.TextField(null=True)
    password = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
 
    class Meta:
        db_table = "accounts"
 
 
class Verification(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    identifier = models.TextField()
    value = models.TextField()
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
 
    class Meta:
        db_table = "verifications"


class Expositor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nome = models.CharField(max_length=255)
    descricao = models.TextField(blank=True)
    imagem_perfil = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    tiktok = models.URLField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "expositores"

    def __str__(self):
        return self.nome


class Peca(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nome = models.CharField(max_length=255)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    imagem = models.URLField(blank=True, null=True)
    expositor = models.ForeignKey(Expositor, on_delete=models.CASCADE, related_name="pecas")
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "pecas"

    def __str__(self):
        return self.nome

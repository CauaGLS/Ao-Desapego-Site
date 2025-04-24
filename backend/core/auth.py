from app.models import Session
from django.utils import timezone
from ninja.security import HttpBearer

class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        session = Session.objects.get(token=token, expires_at__gt=timezone.now())
        if not session:
            return None
        
        if session.expires_at < timezone.now():
            return None
        
        return session.user
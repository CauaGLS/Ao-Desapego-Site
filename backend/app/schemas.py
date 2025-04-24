from ninja import ModelSchema
from .models import Expositor, Peca

class ExpositorSchema(ModelSchema):
    class Meta:
        model = Expositor
        fields = "__all__"

class PecaSchema(ModelSchema):
    class Meta:
        model = Peca
        fields = "__all__"

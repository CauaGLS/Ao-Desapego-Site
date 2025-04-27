from ninja import Schema, ModelSchema
from .models import Expositor, Peca
from uuid import UUID


class ExpositorSchema(ModelSchema):
    id: int
    nome: str
    descricao: str

    class Meta:
        model = Expositor
        fields = "__all__"


class CreateExpositorSchema(Schema):
    nome: str
    descricao: str | None = None  # Permite que a descrição seja opcional



class PecaSchema(ModelSchema):
    id: int
    nome: str
    preco: float
    expositor: UUID

    class Meta:
        model = Peca
        fields = "__all__"



class CreatePecaSchema(Schema):
    nome: str
    preco: float


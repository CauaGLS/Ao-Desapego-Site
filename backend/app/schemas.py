from typing import Optional
from ninja import Schema
from .models import Expositor, Peca
from uuid import UUID
from datetime import datetime


class ExpositorSchema(Schema):
    id: UUID
    nome: str
    descricao: str = ""  # Modificado para string vazia, em vez de Optional[str]
    imagem_perfil: str = ""  # Modificado para string vazia
    instagram: str = ""  # Modificado para string vazia
    facebook: str = ""  # Modificado para string vazia
    tiktok: str = ""  # Modificado para string vazia
    criado_em: datetime
    atualizado_em: datetime


class CreateExpositorSchema(Schema):
    nome: str
    descricao: str = ""  # Modificado para string vazia
    imagem_perfil: str = ""  # Modificado para string vazia
    instagram: str = ""  # Modificado para string vazia
    facebook: str = ""  # Modificado para string vazia
    tiktok: str = ""  # Modificado para string vazia


class PecaSchema(Schema):
    id: UUID
    nome: str
    preco: float
    imagem: str = ""  # Modificado para string vazia
    expositor: UUID  # ou ExpositorSchema se quiser aninhado
    criado_em: datetime
    atualizado_em: datetime


class CreatePecaSchema(Schema):
    nome: str
    preco: float
    imagem: str = ""  # Modificado para string vazia
    expositor: UUID

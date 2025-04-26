from ninja import Router
from typing import List
from .models import Expositor, Peca
from .schemas import (
    ExpositorSchema,
    CreateExpositorSchema,
    PecaSchema,
    CreatePecaSchema
)


router = Router(tags=["Brechos"])

# --- Expositores ---

@router.get("/expositores", response=List[ExpositorSchema])
def listar_expositores(request):
    return Expositor.objects.all()

@router.get("/expositores/{expositor_id}", response=ExpositorSchema)
def obter_expositor(request, expositor_id: str):
    return Expositor.objects.get(id=expositor_id)

@router.post("/expositores", response=ExpositorSchema)
def criar_expositor(request, data: CreateExpositorSchema):
    return Expositor.objects.create(**data.dict())

@router.put("/expositores/{expositor_id}", response=ExpositorSchema)
def atualizar_expositor(request, expositor_id: str, data: CreateExpositorSchema):
    expositor = Expositor.objects.get(id=expositor_id)
    for attr, value in data.dict().items():
        setattr(expositor, attr, value)
    expositor.save()
    return expositor

@router.delete("/expositores/{expositor_id}", response={204: None})
def deletar_expositor(request, expositor_id: str):
    Expositor.objects.get(id=expositor_id).delete()
    return {"success": True}

# --- Peças ---

@router.get("/pecas", response=List[PecaSchema])
def listar_pecas(request):
    return Peca.objects.all()

@router.get("/pecas/{peca_id}", response=PecaSchema)
def obter_peca(request, peca_id: str):
    return Peca.objects.get(id=peca_id)

@router.post("/pecas", response=PecaSchema)
def criar_peca(request, data: CreatePecaSchema):
    return Peca.objects.create(**data.dict())

@router.put("/pecas/{peca_id}", response=PecaSchema)
def atualizar_peca(request, peca_id: str, data: CreatePecaSchema):
    peca = Peca.objects.get(id=peca_id)
    for attr, value in data.dict().items():
        setattr(peca, attr, value)
    peca.save()
    return peca

@router.delete("/pecas/{peca_id}", response={204: None})
def deletar_peca(request, peca_id: str):
    Peca.objects.get(id=peca_id).delete()
    return {"success": True}

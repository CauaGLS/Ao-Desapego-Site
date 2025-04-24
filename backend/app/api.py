from ninja import Router
from django.shortcuts import get_object_or_404
from .models import Expositor, Peca
from .schemas import ExpositorSchema, PecaSchema

router = Router(tags=["Brecho"])


# Expositores
@router.get("/expositores", response=list[ExpositorSchema])
def listar_expositores(request):
    return Expositor.objects.all()


@router.post("/expositores", response=ExpositorSchema)
def criar_expositor(request, data: ExpositorSchema):
    return Expositor.objects.create(**data.dict())


@router.get("/expositores/{expositor_id}", response=ExpositorSchema)
def obter_expositor(request, expositor_id: str):
    return get_object_or_404(Expositor, id=expositor_id)


@router.put("/expositores/{expositor_id}", response=ExpositorSchema)
def atualizar_expositor(request, expositor_id: str, data: ExpositorSchema):
    expositor = get_object_or_404(Expositor, id=expositor_id)
    for attr, value in data.dict().items():
        setattr(expositor, attr, value)
    expositor.save()
    return expositor


@router.delete("/expositores/{expositor_id}")
def deletar_expositor(request, expositor_id: str):
    expositor = get_object_or_404(Expositor, id=expositor_id)
    expositor.delete()
    return {"success": True}



# Peças
@router.get("/pecas", response=list[PecaSchema])
def listar_pecas(request):
    return Peca.objects.all()


@router.post("/pecas", response=PecaSchema)
def criar_peca(request, data: PecaSchema):
    return Peca.objects.create(**data.dict())


@router.get("/pecas/{peca_id}", response=PecaSchema)
def obter_peca(request, peca_id: str):
    return get_object_or_404(Peca, id=peca_id)


@router.put("/pecas/{peca_id}", response=PecaSchema)
def atualizar_peca(request, peca_id: str, data: PecaSchema):
    peca = get_object_or_404(Peca, id=peca_id)
    for attr, value in data.dict().items():
        setattr(peca, attr, value)
    peca.save()
    return peca


@router.delete("/pecas/{peca_id}")
def deletar_peca(request, peca_id: str):
    peca = get_object_or_404(Peca, id=peca_id)
    peca.delete()
    return {"success": True}

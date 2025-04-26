# api.py
from app.api import router as app_router
from ninja import NinjaAPI

class API(NinjaAPI):
    def get_openapi_operation_id(self, operation) -> str:
        name = operation.view_func.__name__
        return name.replace(".", "_")

api = API(
    title="Brecho API",
    version="1.0.0",
    openapi_url="/openapi.json",  # Define o caminho para o arquivo OpenAPI
)

api.add_router("/", app_router)

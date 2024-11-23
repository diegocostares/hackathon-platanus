from ninja import NinjaAPI

from api.routers.dragons import router as dragons_router
from api.routers.missions import router as missions_router
from api.routers.allowances import router as allowances_router
from api.routers.goals import router as goals_router
from api.routers.transactions import router as transactions_router

api = NinjaAPI(title="Hack api", version="1.0.0")
api.add_router("/dragons", dragons_router)
api.add_router("/missions", missions_router)
api.add_router("/allowances", allowances_router)
api.add_router("/goals", goals_router)
api.add_router("/transactions", transactions_router)


@api.get("/status")
def status(request):
    """
    API status check endpoint.

    Returns:
    - A success message confirming the backend is running.
    """
    return {"status": "ok", "message": "Backend is running"}

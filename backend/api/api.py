from ninja import NinjaAPI

# from api.routers import

api = NinjaAPI(title="Hack api", version="1.0.0")
# api.add_router("/auth", auth_router)


@api.get("/status")
def status(request):
    """
    API status check endpoint.

    Returns:
    - A success message confirming the backend is running.
    """
    return {"status": "ok", "message": "Backend is running"}

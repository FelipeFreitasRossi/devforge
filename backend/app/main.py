from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, payments, webhooks, dashboard
from app.routes import lessons as lessons_routes

app = FastAPI(title="Devstack API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ ROUTERS ============
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(payments.router, prefix="/api/payments", tags=["payments"])
app.include_router(webhooks.router, prefix="/api/webhooks", tags=["webhooks"])
app.include_router(dashboard.router)
app.include_router(lessons_routes.router)


@app.get("/")
async def root():
    return {"message": "Devstack API rodando"}


@app.get("/health")
async def health():
    return {"status": "ok"}
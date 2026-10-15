from fastapi import FastAPI

from app.database import Base, engine
from app import models
from app.routers import users_router, channels_router, tasks_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Lab Tracker API",
    description="Backend for lab and homework tracking system",
    version="0.1.0",
)

app.include_router(users_router)
app.include_router(channels_router)
app.include_router(tasks_router)


@app.get("/")
def root():
    return {"status": "ok", "service": "lab-tracker-backend"}
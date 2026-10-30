from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app import models
from app.routers import users_router, channels_router, tasks_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Lab Tracker API",
    description="Backend for lab and homework tracking system",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(channels_router)
app.include_router(tasks_router)


@app.get("/")
def root():
    return {"status": "ok", "service": "lab-tracker-backend"}
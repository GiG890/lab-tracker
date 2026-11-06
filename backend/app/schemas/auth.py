from pydantic import BaseModel, field_validator

from app.schemas.user import normalize_email


class LoginRequest(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def _normalize_email(cls, v: str) -> str:
        return normalize_email(v)


class RefreshRequest(BaseModel):
    refresh_token: str


class LogoutRequest(BaseModel):
    refresh_token: str


class AccessToken(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPair(AccessToken):
    refresh_token: str
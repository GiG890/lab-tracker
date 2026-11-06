from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator


def normalize_email(value: str) -> str:
    value = value.strip().lower()
    if "@" not in value:
        raise ValueError("Invalid email")
    return value


class UserBase(BaseModel):
    name: str
    email: str
    role: str


class UserCreate(UserBase):
    role: Literal["student", "teacher"] = "student"
    password: str = Field(min_length=8)

    @field_validator("email")
    @classmethod
    def _normalize_email(cls, v: str) -> str:
        return normalize_email(v)

    @field_validator("password")
    @classmethod
    def _password_fits_bcrypt(cls, v: str) -> str:
        if len(v.encode("utf-8")) > 72:
            raise ValueError("Password must be at most 72 bytes")
        return v


class UserUpdate(BaseModel):
    name: str | None = None
    email: str | None = None

    @field_validator("email")
    @classmethod
    def _normalize_email(cls, v: str | None) -> str | None:
        return None if v is None else normalize_email(v)


class UserRead(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
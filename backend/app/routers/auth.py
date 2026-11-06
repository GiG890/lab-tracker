from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud
from app.config import settings
from app.database import get_db
from app.schemas import (
    UserCreate,
    UserRead,
    LoginRequest,
    RefreshRequest,
    LogoutRequest,
    AccessToken,
    TokenPair,
)
from app.security import (
    create_access_token,
    generate_refresh_token,
    hash_refresh_token,
    utcnow,
    verify_password,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )
    return crud.create_user(db, user)


@router.post("/login", response_model=TokenPair)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, data.email)
    if user is None or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    refresh_token = generate_refresh_token()
    crud.create_refresh_token(
        db,
        user_id=user.id,
        token_hash=hash_refresh_token(refresh_token),
        expires_at=utcnow() + timedelta(days=settings.refresh_token_expire_days),
    )
    return TokenPair(
        access_token=create_access_token(user.id),
        refresh_token=refresh_token,
    )


@router.post("/refresh", response_model=AccessToken)
def refresh(data: RefreshRequest, db: Session = Depends(get_db)):
    db_token = crud.get_refresh_token(db, hash_refresh_token(data.refresh_token))
    if (
        db_token is None
        or db_token.revoked_at is not None
        or db_token.expires_at <= utcnow()
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid, expired or revoked refresh token",
        )
    return AccessToken(access_token=create_access_token(db_token.user_id))


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(data: LogoutRequest, db: Session = Depends(get_db)):
    db_token = crud.get_refresh_token(db, hash_refresh_token(data.refresh_token))
    if db_token is not None and db_token.revoked_at is None:
        crud.revoke_refresh_token(db, db_token)
    return None
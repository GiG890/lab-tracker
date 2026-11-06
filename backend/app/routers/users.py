from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.dependencies import get_current_user
from app.models import User
from app.schemas import UserRead, UserUpdate


router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/", response_model=list[UserRead])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_users(db, skip=skip, limit=limit)


@router.get("/me", response_model=UserRead)
def read_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return db_user


@router.patch("/{user_id}", response_model=UserRead)
def update_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only edit your own profile",
        )
    if user.email is not None:
        existing = crud.get_user_by_email(db, user.email)
        if existing and existing.id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists",
            )
    return crud.update_user(db, current_user.id, user)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own account",
        )
    crud.delete_user(db, current_user.id)
    return None
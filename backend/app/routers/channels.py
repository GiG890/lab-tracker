from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.schemas import (
    ChannelCreate,
    ChannelRead,
    ChannelUpdate,
    ChannelMemberCreate,
    ChannelMemberRead,
)

router = APIRouter(prefix="/channels", tags=["channels"])


@router.get("/", response_model=list[ChannelRead])
def list_channels(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_channels(db, skip=skip, limit=limit)


@router.post("/", response_model=ChannelRead, status_code=status.HTTP_201_CREATED)
def create_channel(channel: ChannelCreate, db: Session = Depends(get_db)):
    owner = crud.get_user(db, channel.owner_id)
    if owner is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Owner user does not exist",
        )
    return crud.create_channel(db, channel)


@router.get("/{channel_id}", response_model=ChannelRead)
def get_channel(channel_id: int, db: Session = Depends(get_db)):
    db_channel = crud.get_channel(db, channel_id)
    if db_channel is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found",
        )
    return db_channel

@router.patch("/{channel_id}", response_model=ChannelRead)
def update_channel(
    channel_id: int,
    channel: ChannelUpdate,
    db: Session = Depends(get_db),
):
    db_channel = crud.get_channel(db, channel_id)
    if db_channel is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found",
        )
    return crud.update_channel(db, channel_id, channel)


@router.delete("/{channel_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_channel(channel_id: int, db: Session = Depends(get_db)):
    db_channel = crud.delete_channel(db, channel_id)
    if db_channel is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found",
        )
    return None


@router.get("/{channel_id}/members", response_model=list[ChannelMemberRead])
def list_channel_members(channel_id: int, db: Session = Depends(get_db)):
    db_channel = crud.get_channel(db, channel_id)
    if db_channel is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found",
        )
    return crud.get_channel_members(db, channel_id)


@router.post(
    "/{channel_id}/members",
    response_model=ChannelMemberRead,
    status_code=status.HTTP_201_CREATED,
)
def add_channel_member(
    channel_id: int,
    member: ChannelMemberCreate,
    db: Session = Depends(get_db),
):
    db_channel = crud.get_channel(db, channel_id)
    if db_channel is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found",
        )
    user = crud.get_user(db, member.user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User does not exist",
        )
    return crud.add_member(db, member)


@router.delete("/members/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_channel_member(member_id: int, db: Session = Depends(get_db)):
    db_member = crud.remove_member(db, member_id)
    if db_member is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel member not found",
        )
    return None
from sqlalchemy.orm import Session

from app.models import Channel, ChannelMember
from app.schemas import ChannelCreate, ChannelUpdate, ChannelMemberCreate


def get_channel(db: Session, channel_id: int) -> Channel | None:
    return db.query(Channel).filter(Channel.id == channel_id).first()


def get_channels(db: Session, skip: int = 0, limit: int = 100) -> list[Channel]:
    return db.query(Channel).offset(skip).limit(limit).all()


def create_channel(db: Session, channel_data: ChannelCreate) -> Channel:
    db_channel = Channel(
        name=channel_data.name,
        description=channel_data.description,
        owner_id=channel_data.owner_id,
    )
    db.add(db_channel)
    db.commit()
    db.refresh(db_channel)
    return db_channel

def update_channel(
    db: Session, channel_id: int, channel_data: ChannelUpdate
) -> Channel | None:
    db_channel = get_channel(db, channel_id)
    if db_channel is None:
        return None
    update_data = channel_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_channel, field, value)
    db.commit()
    db.refresh(db_channel)
    return db_channel


def delete_channel(db: Session, channel_id: int) -> Channel | None:
    db_channel = get_channel(db, channel_id)
    if db_channel is None:
        return None
    db.delete(db_channel)
    db.commit()
    return db_channel


def get_member(db: Session, member_id: int) -> ChannelMember | None:
    return db.query(ChannelMember).filter(ChannelMember.id == member_id).first()


def get_channel_members(db: Session, channel_id: int) -> list[ChannelMember]:
    return db.query(ChannelMember).filter(ChannelMember.channel_id == channel_id).all()


def add_member(db: Session, member_data: ChannelMemberCreate) -> ChannelMember:
    db_member = ChannelMember(
        user_id=member_data.user_id,
        channel_id=member_data.channel_id,
        role_in_channel=member_data.role_in_channel,
    )
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


def remove_member(db: Session, member_id: int) -> ChannelMember | None:
    db_member = get_member(db, member_id)
    if db_member is None:
        return None
    db.delete(db_member)
    db.commit()
    return db_member
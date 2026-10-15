from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ChannelBase(BaseModel):
    name: str
    description: str | None = None


class ChannelCreate(ChannelBase):
    owner_id: int


class ChannelRead(ChannelBase):
    id: int
    owner_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ChannelMemberBase(BaseModel):
    user_id: int
    channel_id: int
    role_in_channel: str


class ChannelMemberCreate(ChannelMemberBase):
    pass


class ChannelMemberRead(ChannelMemberBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
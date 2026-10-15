from datetime import datetime

from pydantic import BaseModel, ConfigDict


class TaskBase(BaseModel):
    title: str
    description: str | None = None
    type: str
    deadline: datetime | None = None


class TaskCreate(TaskBase):
    channel_id: int


class TaskRead(TaskBase):
    id: int
    channel_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
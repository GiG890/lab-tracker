from datetime import datetime

from sqlalchemy import String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    type: Mapped[str] = mapped_column(String(20))
    deadline: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    channel_id: Mapped[int] = mapped_column(ForeignKey("channels.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    channel = relationship("Channel", back_populates="tasks")
from sqlalchemy.orm import Session

from app.models import Task
from app.schemas import TaskCreate


def get_task(db: Session, task_id: int) -> Task | None:
    return db.query(Task).filter(Task.id == task_id).first()


def get_tasks(db: Session, skip: int = 0, limit: int = 100) -> list[Task]:
    return db.query(Task).offset(skip).limit(limit).all()


def get_tasks_by_channel(db: Session, channel_id: int) -> list[Task]:
    return db.query(Task).filter(Task.channel_id == channel_id).all()


def create_task(db: Session, task_data: TaskCreate) -> Task:
    db_task = Task(
        title=task_data.title,
        description=task_data.description,
        type=task_data.type,
        deadline=task_data.deadline,
        channel_id=task_data.channel_id,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int) -> Task | None:
    db_task = get_task(db, task_id)
    if db_task is None:
        return None
    db.delete(db_task)
    db.commit()
    return db_task
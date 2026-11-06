from datetime import datetime

from sqlalchemy.orm import Session

from app.models import RefreshToken
from app.security import utcnow


def create_refresh_token(
    db: Session, user_id: int, token_hash: str, expires_at: datetime
) -> RefreshToken:
    db_token = RefreshToken(
        user_id=user_id, token_hash=token_hash, expires_at=expires_at
    )
    db.add(db_token)
    db.commit()
    db.refresh(db_token)
    return db_token


def get_refresh_token(db: Session, token_hash: str) -> RefreshToken | None:
    return db.query(RefreshToken).filter(RefreshToken.token_hash == token_hash).first()


def revoke_refresh_token(db: Session, db_token: RefreshToken) -> RefreshToken:
    db_token.revoked_at = utcnow()
    db.commit()
    db.refresh(db_token)
    return db_token
# lab-tracker

Трекер лабораторных работ и домашних заданий.

## Стек

- Backend: Python 3.10, FastAPI, SQLAlchemy 2.0
- База данных: PostgreSQL 18
- Frontend: React, TypeScript, Vite, Ant Design

## Структура

- `backend/` - серверная часть (FastAPI + PostgreSQL)
- `frontend/` - клиентская часть (React + TypeScript)

## Модель данных

### users

| Поле | Тип | Описание |
|---|---|---|
| id | int, PK | идентификатор |
| name | varchar(100) | имя пользователя |
| email | varchar(255), unique | email |
| password_hash | varchar(255) | хэш пароля (bcrypt) |
| role | varchar(20) | student / teacher |
| created_at | timestamp | дата создания |

### channels

| Поле | Тип | Описание |
|---|---|---|
| id | int, PK | идентификатор |
| name | varchar(150) | название канала |
| description | text, nullable | описание |
| owner_id | int, FK -> users.id | владелец канала |
| created_at | timestamp | дата создания |

### channel_members

| Поле | Тип | Описание |
|---|---|---|
| id | int, PK | идентификатор |
| user_id | int, FK -> users.id | пользователь |
| channel_id | int, FK -> channels.id | канал |
| role_in_channel | varchar(20) | роль в канале |
| created_at | timestamp | дата добавления |

### tasks

| Поле | Тип | Описание |
|---|---|---|
| id | int, PK | идентификатор |
| title | varchar(200) | название задания |
| description | text, nullable | описание |
| type | varchar(20) | lab / homework |
| deadline | timestamp, nullable | срок сдачи |
| channel_id | int, FK -> channels.id | канал |
| created_at | timestamp | дата создания |

### Связи

- `users` 1:N `channels` - один преподаватель владеет многими каналами
- `users` M:N `channels` через `channel_members` — участники каналов
- `channels` 1:N `tasks` - в канале много заданий

## Запуск backend

1. Создать виртуальное окружение и активировать:

```
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```



2. Установить зависимости:
```
pip install -r requirements.txt
```


3. Создать `.env` на основе `.env.example` и указать параметры подключения к PostgreSQL.

4. Подготовить базу данных: создать пользователя и базу `lab_tracker` в PostgreSQL.

5. Запустить сервер:
```
uvicorn app.main:app --reload
```


Таблицы создаются автоматически при старте приложения.

Swagger: http://127.0.0.1:8000/docs

## Запуск frontend
```
cd frontend
npm install
npm run dev
```


Приложение откроется на http://localhost:5173
@echo off

REM Check if the virtual environment directory exists
IF EXIST ".venv" (
    echo Starting application...
    call .venv\Scripts\activate
    python main.py
)

@echo off
set CORS_ALLOW_ORIGIN=http://localhost:5173;http://localhost:8080
set PORT=8080
uvicorn main:app --port %PORT% --host 0.0.0.0 --forwarded-allow-ips "*" --reload
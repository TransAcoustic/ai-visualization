$env:CORS_ALLOW_ORIGIN = "http://localhost:5173;http://localhost:8080"
Write-Host "Starting Open WebUI..." -ForegroundColor Green
uvicorn open_webui.main:app --port 8080 --host 0.0.0.0 --forwarded-allow-ips "*" --reload

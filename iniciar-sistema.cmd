@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao foi encontrado no PATH.
  echo Instale o Node.js ou execute "node server.js" em um terminal configurado.
  pause
  exit /b 1
)
node server.js
pause

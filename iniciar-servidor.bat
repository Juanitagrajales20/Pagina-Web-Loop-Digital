@echo off
REM Vista previa local Loop Digital -> http://localhost:8080 (requiere Node.js)
cd /d "%~dp0"
start "LoopDigital-Preview" /min node servidor.js
timeout /t 2 >nul
start http://localhost:8080/Showroom%%20Loop%%20Digital.dc.html

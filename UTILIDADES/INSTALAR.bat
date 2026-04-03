@echo off
TITLE Instalacion - Sistema de Reservas Teknosur
cd /d "%~dp0\.."
COLOR 0B

echo ========================================================
echo    INSTALANDO DEPENDENCIAS (npm install)
echo ========================================================
echo.
echo [+] Verificando version de Node...
node -v
if %errorlevel% neq 0 (
    echo [!] ERROR: Node.js no esta instalado. Por favor instale Node.js.
    pause
    exit /b
)

echo.
echo [+] Instalando librerias necesarias...
call npm install

echo.
echo ========================================================
echo    ¡INSTALACION FINALIZADA!
echo ========================================================
echo.
pause

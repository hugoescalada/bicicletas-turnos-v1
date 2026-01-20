@echo off
TITLE Sistema de Reservas - Bicis
echo Iniciando el sistema de reservas...
echo.

:: Abrir una nueva ventana para el servidor de base de datos (Node.js)
echo Lanzando Servidor de Base de Datos...
start "Servidor/BD" cmd /k "node server/index.js"

:: Esperar un momento para asegurar que la BD este lista
timeout /t 2 /nobreak > nul

:: Lanzar el servidor Web en la ventana actual
echo Lanzando Servidor Web (Modo Red Local)...
npm run dev -- --host

echo.
echo Sistema iniciado correctamente.
pause

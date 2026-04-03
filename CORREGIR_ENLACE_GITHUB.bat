@echo off
TITLE Corregir Enlace GitHub - Teknosur
COLOR 0D
echo ===========================================
echo    ACTUALIZANDO ENLACE DE GITHUB (TEKNOSUR)
echo ===========================================
echo.

echo [+] Cambiando direccion de "hugoescalada" a "teknosur"...
git remote set-url origin https://github.com/teknosur/bicicletas-turnos-v1.git

echo.
echo [+] Verificando nuevo enlace...
git remote -v

echo.
echo ===========================================
echo    ¡ENLACE ACTUALIZADO CORRECTAMENTE!
echo ===========================================
echo.
echo Ahora ya puedes usar "DESCARGAR_ACTUALIZACION.bat".
echo.
pause

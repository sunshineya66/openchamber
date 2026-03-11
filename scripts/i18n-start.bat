@echo off
REM i18n-start.bat - Start i18n services for OpenChamber
REM Usage: Run this after i18n-build.ts has completed

REM Get the script directory (project root)
set "SCRIPT_DIR=%~dp0"
set "PROJECT_ROOT=%SCRIPT_DIR%.."
cd /d "%PROJECT_ROOT%"

echo [i18n-start] Starting i18n services...
echo.

REM Check if temp directory exists
if not exist ".i18n-temp\packages\web\dist" (
    echo [i18n-start] Error: Build not found.
    echo Please run "bun scripts/i18n-build.ts" first.
    echo.
    pause
    exit /b 1
)

echo [i18n-start] Starting server on port 3000...
start "OpenChamber i18n" cmd /c "cd /d .i18n-temp\packages\web && bun run start --port 3000"

echo.
echo [i18n-start] Server started at http://localhost:3000
echo.
pause

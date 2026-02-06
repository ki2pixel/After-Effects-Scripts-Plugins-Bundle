@echo off
setlocal

set EXT_SRC=%~dp0..\
set CEP_EXT_DIR=%APPDATA%\Adobe\CEP\extensions\PyShiftBridge

echo Installing PyShiftBridge CEP extension...
echo Source: %EXT_SRC%
echo Target: %CEP_EXT_DIR%

if not exist "%APPDATA%\Adobe\CEP\extensions" (
  mkdir "%APPDATA%\Adobe\CEP\extensions"
)

if exist "%CEP_EXT_DIR%" (
  echo Removing existing install...
  rmdir /s /q "%CEP_EXT_DIR%"
)

xcopy "%EXT_SRC%" "%CEP_EXT_DIR%" /E /I /Y >nul

echo Done.
echo.
echo NOTE: You may need to enable unsigned CEP extensions via PlayerDebugMode.
echo Restart After Effects.
endlocal

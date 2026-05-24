@echo off
setlocal

cd /d "%~dp0"

if "%~1"=="" (
  set "COMMIT_MSG=update portfolio"
) else (
  set "COMMIT_MSG=%*"
)

echo [1/4] git add -A
git add -A
if errorlevel 1 goto :error

echo [2/4] checking staged changes
git diff --cached --quiet
if %errorlevel%==0 (
  echo No changes to commit.
  goto :done
)

echo [3/4] git commit -m "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"
if errorlevel 1 goto :error

echo [4/4] git push origin main
git push origin main
if errorlevel 1 goto :error

goto :done

:error
echo.
echo Git process failed. Please check the error above.
exit /b 1

:done
echo.
echo Done.
exit /b 0
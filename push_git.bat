@echo off
setlocal

cd /d "%~dp0"

set "TARGET_BRANCH=main"
set "DEFAULT_COMMIT_MSG=update portfolio"

if "%~1"=="" (
  set "COMMIT_MSG=%DEFAULT_COMMIT_MSG%"
) else (
  set "COMMIT_MSG=%*"
)

echo ========================================
echo Git Auto Push
echo Repo   : %CD%
echo Branch : %TARGET_BRANCH%
echo ========================================

echo [1/4] Stage changes
git add -A
if errorlevel 1 goto :error

echo [2/4] Check staged changes
git diff --cached --quiet
if errorlevel 2 goto :error
if errorlevel 1 goto :commit
echo No changes to commit.
goto :done

:commit
echo [3/4] Create commit
git commit -m "%COMMIT_MSG%"
if errorlevel 1 goto :error

echo [4/4] Push to origin/%TARGET_BRANCH%
git push origin %TARGET_BRANCH%
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

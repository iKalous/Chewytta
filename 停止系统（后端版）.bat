@echo off
echo ========================================
echo         Chewytta 系统停止工具
echo ========================================
echo.

echo 正在停止 Chewytta 系统...
docker-compose -f docker-compose-backend-only.yml down

if %errorlevel% equ 0 (
    echo ✅ 系统已成功停止！
) else (
    echo ❌ 系统停止失败！
)

echo.
pause

@echo off
echo ========================================
echo         Chewytta 系统启动工具
echo ========================================
echo.

echo 正在检查 Docker 状态...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker 未运行或未安装！
    echo 请先启动 Docker Desktop
    pause
    exit /b 1
)
echo ✅ Docker 运行正常

echo.
echo 正在启动 Chewytta 系统（后端 + 数据库）...
docker-compose -f docker-compose-backend-only.yml up -d

if %errorlevel% equ 0 (
    echo.
    echo ✅ 系统启动成功！
    echo.
    echo 📋 服务信息：
    echo    • 后端服务：http://localhost:8080
    echo    • 数据库：localhost:3306
    echo.
    echo 💡 使用 "停止系统.bat" 来停止服务
) else (
    echo ❌ 系统启动失败！
    echo 请检查错误信息
)

echo.
pause

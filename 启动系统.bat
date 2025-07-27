@echo off
chcp 65001 >nul 2>&1
echo ==============================================
echo         🚀 启动 Chewytta 系统 (Docker版)
echo ==============================================
echo.

echo [1/4] 检查Docker运行状态...
docker version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker未启动或未安装，请先启动Docker Desktop
    pause
    exit /b 1
)
echo ✅ Docker运行正常

echo.
echo [2/4] 停止可能运行的旧容器...
docker-compose down --remove-orphans

echo.
echo [3/4] 构建并启动所有服务...
echo 💡 首次启动可能需要几分钟下载镜像和构建...
docker-compose up -d --build

echo.
echo [4/4] 等待服务启动完成...
timeout /t 10 /nobreak >nul

echo.
echo 🔍 检查服务状态...
docker-compose ps

echo.
echo ==============================================
echo                 🎉 启动完成！
echo ==============================================
echo 📱 前端访问地址: http://localhost
echo 🔧 后端API地址:  http://localhost:8080
echo 💾 数据库端口:   localhost:3306
echo 📦 Redis端口:    localhost:6379
echo.
echo 🔑 默认管理员账号:
echo    用户名: root
echo    密码:   123456
echo.
echo 💡 查看日志命令: docker-compose logs -f [服务名]
echo 🛑 停止系统命令: 双击 "停止系统.bat"
echo ==============================================

pause

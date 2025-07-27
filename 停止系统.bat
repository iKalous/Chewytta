@echo off
chcp 65001 >nul 2>&1
echo ==============================================
echo         🛑 停止 Chewytta 系统 (Docker版)
echo ==============================================
echo.

echo [1/2] 停止所有服务...
docker-compose down

echo.
echo [2/2] 清理网络和临时资源...
docker-compose down --remove-orphans

echo.
echo ==============================================
echo                 ✅ 停止完成！
echo ==============================================
echo 💡 如需完全清理（包括数据），请运行：
echo    docker-compose down -v --remove-orphans
echo.
echo 🔄 重新启动系统: 双击 "启动系统.bat"
echo ==============================================

pause

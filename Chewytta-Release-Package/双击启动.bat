@echo off
chcp 65001 >nul 2>&1
title Chewytta 盲盒系统

echo ========================================
echo    🎁 Chewytta 盲盒系统 🎁
echo          双击启动版
echo ========================================
echo.

:: 检查文件是否存在
if not exist "Chewytta.exe" (
    echo ❌ 未找到 Chewytta.exe 文件！
    echo 请确保文件完整性
    pause
    exit /b 1
)

echo 🚀 启动 Chewytta 盲盒系统...
echo.
echo 💡 系统启动后，请访问: http://localhost:8080
echo.
echo 🔑 默认管理员账号:
echo    用户名: root
echo    密码: 123456
echo.
echo 📱 正在启动，请稍候...

:: 启动程序
start "Chewytta System" "Chewytta.exe" --spring.config.location=application-embedded.yml

:: 等待一小段时间
timeout /t 3 /nobreak >nul

echo.
echo ✅ 系统启动指令已发送！
echo 🌐 请稍候片刻，然后访问: http://localhost:8080
echo.
echo 📝 使用说明请查看: README_独立版使用说明.md
echo.
pause

@echo off
chcp 65001 >nul 2>&1
title Chewytta 盲盒系统

echo ========================================
echo    🎁 Chewytta 盲盒系统 🎁
echo       欢迎使用无 Docker 版本
echo ========================================
echo.

:: 检查 Java 环境
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到 Java 运行环境
    echo.
    echo 📥 请先安装 Java 运行环境 (JRE 17+):
    echo    下载地址: https://adoptium.net/
    echo.
    echo 🔧 安装步骤:
    echo    1. 访问上述网址
    echo    2. 下载 JRE 17 或更高版本
    echo    3. 安装完成后重新运行本程序
    echo.
    pause
    exit /b 1
)

echo ✅ Java 环境检查通过
echo.

:: 查找 JAR 文件
set "JAR_FILE="
if exist "Chewytta-0.0.1-SNAPSHOT.jar" set "JAR_FILE=Chewytta-0.0.1-SNAPSHOT.jar"
if exist "target\Chewytta-0.0.1-SNAPSHOT.jar" set "JAR_FILE=target\Chewytta-0.0.1-SNAPSHOT.jar"
if exist "Chewytta\target\Chewytta-0.0.1-SNAPSHOT.jar" set "JAR_FILE=Chewytta\target\Chewytta-0.0.1-SNAPSHOT.jar"

if "%JAR_FILE%"=="" (
    echo ❌ 未找到系统文件
    echo 💡 请确保 Chewytta-0.0.1-SNAPSHOT.jar 文件存在
    pause
    exit /b 1
)

echo 🚀 正在启动 Chewytta 盲盒系统...
echo 📁 使用文件: %JAR_FILE%
echo.

:: 创建必要的目录
if not exist "data" mkdir data
if not exist "logs" mkdir logs
if not exist "ChewyApp" mkdir ChewyApp
if not exist "ChewyApp\userdata" mkdir ChewyApp\userdata
if not exist "AdminContent" mkdir AdminContent

echo ⏳ 系统启动中，请稍候...
echo 💡 首次启动可能需要 30-60 秒

:: 启动系统
start /B java -jar "%JAR_FILE%" --spring.profiles.active=embedded --server.port=8088

:: 等待系统启动
timeout /t 5 /nobreak >nul

echo.
echo 🔍 检查系统启动状态...

:: 检查端口是否可用
:check_startup
timeout /t 3 /nobreak >nul
netstat -an | find "8088" | find "LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    goto startup_success
) else (
    echo ⏳ 系统仍在启动中...
    goto check_startup
)

:startup_success
echo.
echo ========================================
echo 🎉 Chewytta 系统启动成功！
echo ========================================
echo.
echo 🌐 访问地址: http://localhost:8088
echo 👤 管理员账号: root
echo 🔑 默认密码: 123456
echo.
echo 📁 数据存储位置:
echo    数据库: ./data/chewytta.mv.db
echo    日志文件: ./logs/chewytta.log
echo    用户文件: ./ChewyApp/userdata/
echo.
echo 🎯 使用说明:
echo    - 普通用户可以注册账号体验购买盲盒
echo    - 管理员可以登录后台管理商品和用户
echo    - 关闭此窗口不会关闭系统
echo    - 如需关闭系统，请按 Ctrl+C
echo.

echo 🌐 正在打开浏览器...
timeout /t 2 /nobreak >nul
start http://localhost:8088

echo.
echo 💡 系统已在后台运行
echo 📞 如遇问题，请检查防火墙设置
echo.
echo 按任意键最小化窗口（系统继续运行）
pause >nul

:: 最小化窗口但保持运行
powershell -command "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class Win32 { [DllImport(\"user32.dll\")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow); [DllImport(\"kernel32.dll\")] public static extern IntPtr GetConsoleWindow(); }'; $hwnd = [Win32]::GetConsoleWindow(); [Win32]::ShowWindow($hwnd, 2)"

:keep_running
timeout /t 30 /nobreak >nul
goto keep_running

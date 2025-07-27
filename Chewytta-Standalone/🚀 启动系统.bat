@echo off
chcp 65001 >nul 2>&1
title Chewytta 盲盒系统 - 独立版

echo ========================================
echo    🎁 Chewytta 盲盒系统 🎁
echo        独立版 - 无需Docker
echo ========================================
echo.

:: 检查 Java 环境
echo 🔍 检查 Java 运行环境...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ 未检测到 Java 运行环境！
    echo.
    echo 📥 请先安装 Java 运行环境 (JRE 17+):
    echo    🌐 下载地址: https://adoptium.net/
    echo    💡 或使用命令: winget install EclipseAdoptium.Temurin.17.JRE
    echo.
    echo 🔧 安装步骤:
    echo    1. 访问上述网址下载 JRE 17
    echo    2. 安装完成后重新运行本程序
    echo    3. 如已安装但仍提示，请重启电脑
    echo.
    pause
    exit /b 1
)

:: 显示 Java 版本信息
for /f "tokens=3" %%g in ('java -version 2^>^&1 ^| findstr /i "version"') do (
    set JAVA_VERSION=%%g
)
set JAVA_VERSION=%JAVA_VERSION:"=%
echo ✅ Java 环境: %JAVA_VERSION%
echo.

:: 创建必要的目录
echo 📁 初始化系统目录...
if not exist "data" mkdir data
if not exist "logs" mkdir logs
if not exist "ChewyApp" mkdir ChewyApp
if not exist "ChewyApp\userdata" mkdir ChewyApp\userdata
if not exist "ChewyApp\userdata\avatars" mkdir ChewyApp\userdata\avatars
if not exist "ChewyApp\userdata\favorites" mkdir ChewyApp\userdata\favorites
if not exist "ChewyApp\userdata\uploads" mkdir ChewyApp\userdata\uploads

:: 查找可执行文件
set "EXEC_FILE="
if exist "Chewytta-0.0.1-SNAPSHOT.exe" (
    set "EXEC_FILE=Chewytta-0.0.1-SNAPSHOT.exe"
    set "EXEC_TYPE=EXE"
) else if exist "Chewytta-0.0.1-SNAPSHOT.jar" (
    set "EXEC_FILE=Chewytta-0.0.1-SNAPSHOT.jar"
    set "EXEC_TYPE=JAR"
) else (
    echo ❌ 未找到系统程序文件
    echo 💡 请确保以下文件之一存在:
    echo    - Chewytta-0.0.1-SNAPSHOT.exe
    echo    - Chewytta-0.0.1-SNAPSHOT.jar
    pause
    exit /b 1
)

echo ✅ 发现系统文件: %EXEC_FILE% (%EXEC_TYPE%)
echo.

:: 检查端口占用
echo 🔍 检查端口 8088...
netstat -an | find "8088" | find "LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  端口 8088 已被占用
    echo 💡 可能系统已在运行，或被其他程序占用
    echo 🌐 请尝试访问: http://localhost:8088
    echo.
    pause
    exit /b 0
)

echo 🚀 正在启动 Chewytta 盲盒系统...
echo 💡 首次启动可能需要 30-60 秒，请耐心等待...
echo.

:: 启动系统
if "%EXEC_TYPE%"=="EXE" (
    echo 🎯 使用 EXE 方式启动...
    start /B "%EXEC_FILE%"
) else (
    echo 🎯 使用 JAR 方式启动...
    start /B java -jar "%EXEC_FILE%" --spring.profiles.active=embedded --server.port=8088
)

:: 等待系统启动
echo ⏳ 系统启动中...
set /a "attempts=0"
:check_startup
set /a "attempts+=1"
timeout /t 3 /nobreak >nul

:: 检查端口是否开放
netstat -an | find "8088" | find "LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    goto startup_success
)

if %attempts% geq 30 (
    echo.
    echo ❌ 启动超时！系统可能启动失败
    echo 💡 请检查以下问题:
    echo    1. 是否有足够的内存空间
    echo    2. 是否有杀毒软件阻止
    echo    3. 查看 logs 目录下的日志文件
    echo.
    pause
    exit /b 1
)

echo ⏳ 启动中... [%attempts%/30]
goto check_startup

:startup_success
echo.
echo ========================================
echo 🎉 Chewytta 系统启动成功！
echo ========================================
echo.
echo 🌐 系统地址: http://localhost:8088
echo 👑 管理员账号: root
echo 🔑 默认密码: 123456
echo.
echo 📊 系统信息:
echo    💾 数据存储: ./data/chewytta.mv.db
echo    📝 系统日志: ./logs/chewytta.log
echo    🎨 用户文件: ./ChewyApp/userdata/
echo.
echo 🎯 使用提示:
echo    ✅ 普通用户: 注册账号体验购买盲盒
echo    ✅ 管理员: 登录后台管理商品和用户
echo    ✅ 关闭窗口不会停止系统
echo    ✅ 系统在后台持续运行
echo.

echo 🌐 正在打开浏览器...
timeout /t 2 /nobreak >nul
start http://localhost:8088

echo.
echo 💡 系统已在后台运行
echo 🔒 要停止系统，请按 Ctrl+C
echo 📱 或者直接关闭此窗口（系统继续运行）
echo.
echo 按任意键最小化窗口...
pause >nul

:: 最小化窗口但保持系统运行
powershell -WindowStyle Hidden -Command "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class Win32 { [DllImport(\"user32.dll\")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow); [DllImport(\"kernel32.dll\")] public static extern IntPtr GetConsoleWindow(); }'; $hwnd = [Win32]::GetConsoleWindow(); [Win32]::ShowWindow($hwnd, 2)"

:keep_running
timeout /t 60 /nobreak >nul
goto keep_running

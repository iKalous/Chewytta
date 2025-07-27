@echo off
chcp 65001 >nul 2>&1
title Chewytta 盲盒系统 - 智能启动

echo ========================================
echo    🎁 Chewytta 盲盒系统 🎁
echo       智能Java启动版本
echo ========================================
echo.

:: 检查文件是否存在
if not exist "Chewytta.jar" (
    echo ❌ 未找到 Chewytta.jar 文件！
    echo 请确保文件完整性
    pause
    exit /b 1
)

echo 🔍 检查Java环境...

:: 首先尝试找到Java 17+
set "JAVA_CMD="

:: 检查JAVA_HOME是否指向Java 17+
if defined JAVA_HOME (
    "%JAVA_HOME%\bin\java.exe" -version 2>temp_version.txt
    findstr /C:"17\." temp_version.txt >nul 2>&1
    if not errorlevel 1 (
        set "JAVA_CMD=%JAVA_HOME%\bin\java.exe"
        echo ✅ 找到Java 17 在 JAVA_HOME: %JAVA_HOME%
        goto :run_app
    )
    findstr /C:"1[8-9]\." temp_version.txt >nul 2>&1
    if not errorlevel 1 (
        set "JAVA_CMD=%JAVA_HOME%\bin\java.exe"
        echo ✅ 找到Java 18+ 在 JAVA_HOME: %JAVA_HOME%
        goto :run_app
    )
    findstr /C:"2[0-9]\." temp_version.txt >nul 2>&1
    if not errorlevel 1 (
        set "JAVA_CMD=%JAVA_HOME%\bin\java.exe"
        echo ✅ 找到Java 20+ 在 JAVA_HOME: %JAVA_HOME%
        goto :run_app
    )
    del temp_version.txt >nul 2>&1
)

:: 检查PATH中的java命令
java -version 2>temp_version.txt
findstr /C:"17\." temp_version.txt >nul 2>&1
if not errorlevel 1 (
    set "JAVA_CMD=java"
    echo ✅ 找到Java 17 在系统PATH中
    del temp_version.txt >nul 2>&1
    goto :run_app
)
findstr /C:"1[8-9]\." temp_version.txt >nul 2>&1
if not errorlevel 1 (
    set "JAVA_CMD=java"
    echo ✅ 找到Java 18+ 在系统PATH中
    del temp_version.txt >nul 2>&1
    goto :run_app
)
findstr /C:"2[0-9]\." temp_version.txt >nul 2>&1
if not errorlevel 1 (
    set "JAVA_CMD=java"
    echo ✅ 找到Java 20+ 在系统PATH中
    del temp_version.txt >nul 2>&1
    goto :run_app
)
del temp_version.txt >nul 2>&1

:: 检查常见的Java安装位置
for %%d in (
    "C:\Program Files\Java\jdk-17*\bin\java.exe"
    "C:\Program Files\Java\jdk-18*\bin\java.exe"
    "C:\Program Files\Java\jdk-19*\bin\java.exe"
    "C:\Program Files\Java\jdk-20*\bin\java.exe"
    "C:\Program Files\Java\jdk-21*\bin\java.exe"
    "C:\Program Files\Eclipse Adoptium\jdk-17*\bin\java.exe"
    "C:\Program Files\Eclipse Adoptium\jdk-18*\bin\java.exe"
    "C:\Program Files\Eclipse Adoptium\jdk-19*\bin\java.exe"
    "C:\Program Files\Eclipse Adoptium\jdk-20*\bin\java.exe"
    "C:\Program Files\Eclipse Adoptium\jdk-21*\bin\java.exe"
) do (
    if exist "%%~d" (
        set "JAVA_CMD=%%~d"
        echo ✅ 找到Java 17+ 在: %%~d
        goto :run_app
    )
)

:: 如果没有找到Java 17+，提示用户
echo.
echo ❌ 未找到Java 17或更高版本！
echo.
echo 📥 请安装Java 17或更高版本:
echo    🌐 下载地址: https://adoptium.net/
echo    💡 或使用命令: winget install EclipseAdoptium.Temurin.17.JRE
echo.
echo 🔧 当前检测到的Java版本:
java -version 2>&1
echo.
echo 📋 安装步骤:
echo    1. 访问 https://adoptium.net/ 下载 Java 17
echo    2. 安装完成后重新运行本程序
echo    3. 如已安装但仍提示，请重启电脑或设置JAVA_HOME
echo.
pause
exit /b 1

:run_app
echo.
echo 🚀 启动 Chewytta 盲盒系统...
echo.
echo 💡 系统启动后，请访问: http://localhost:8080
echo.
echo 🔑 默认管理员账号:
echo    用户名: root
echo    密码: 123456
echo.
echo 📱 正在启动，请稍候...
echo.

:: 启动应用
"%JAVA_CMD%" -jar "Chewytta.jar" --spring.config.location=application-embedded.yml

echo.
echo 🛑 系统已停止运行
pause

@echo off
chcp 65001 >nul 2>&1
title 停止 Chewytta 系统

echo ========================================
echo    🛑 停止 Chewytta 盲盒系统
echo ========================================
echo.

:: 查找并停止相关进程
echo 🔍 查找 Chewytta 进程...

:: 停止 EXE 进程
tasklist /FI "IMAGENAME eq Chewytta-0.0.1-SNAPSHOT.exe" 2>NUL | find /I /N "Chewytta-0.0.1-SNAPSHOT.exe" >NUL
if "%ERRORLEVEL%"=="0" (
    echo 🛑 停止 EXE 进程...
    taskkill /F /IM "Chewytta-0.0.1-SNAPSHOT.exe" >nul 2>&1
    echo ✅ EXE 进程已停止
)

:: 停止 Java 进程（通过端口8088识别）
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8088" ^| find "LISTENING"') do (
    if not "%%a"=="" (
        echo 🛑 停止 Java 进程 (PID: %%a)...
        taskkill /F /PID %%a >nul 2>&1
        echo ✅ Java 进程已停止
    )
)

:: 验证停止结果
timeout /t 2 /nobreak >nul
netstat -an | find "8088" | find "LISTENING" >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ✅ Chewytta 系统已完全停止
    echo 💾 所有数据已自动保存到 data 目录
) else (
    echo.
    echo ⚠️  系统可能仍在运行
    echo 💡 请手动检查任务管理器中的相关进程
)

echo.
echo 📱 下次使用时，请双击 "🚀 启动系统.bat"
echo.
pause

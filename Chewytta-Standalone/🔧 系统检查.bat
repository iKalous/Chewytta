@echo off
chcp 65001 >nul 2>&1
title Chewytta 系统检查工具

echo ========================================
echo    🔧 Chewytta 系统检查工具
echo ========================================
echo.

echo 🔍 正在检查系统环境...
echo.

:: 检查 Java 环境
echo [1/6] 检查 Java 运行环境...
java -version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=3" %%g in ('java -version 2^>^&1 ^| findstr /i "version"') do (
        set JAVA_VERSION=%%g
    )
    set JAVA_VERSION=%JAVA_VERSION:"=%
    echo ✅ Java 已安装: %JAVA_VERSION%
    
    :: 检查 Java 版本是否符合要求
    echo %JAVA_VERSION% | findstr /R "^1\.[0-9][0-6]\." >nul
    if %errorlevel% equ 0 (
        echo ⚠️  Java 版本过低，建议升级到 17+
    ) else (
        echo ✅ Java 版本符合要求
    )
) else (
    echo ❌ Java 未安装或未配置环境变量
    echo 💡 请访问 https://adoptium.net/ 下载安装
)
echo.

:: 检查系统文件
echo [2/6] 检查系统文件...
if exist "Chewytta-0.0.1-SNAPSHOT.exe" (
    echo ✅ 找到 EXE 文件: Chewytta-0.0.1-SNAPSHOT.exe
) else (
    echo ❌ 未找到 EXE 文件
)

if exist "Chewytta-0.0.1-SNAPSHOT.jar" (
    echo ✅ 找到 JAR 文件: Chewytta-0.0.1-SNAPSHOT.jar
) else (
    echo ❌ 未找到 JAR 文件
)

if exist "application-embedded.yml" (
    echo ✅ 找到配置文件: application-embedded.yml
) else (
    echo ❌ 未找到配置文件
)
echo.

:: 检查目录结构
echo [3/6] 检查目录结构...
if exist "data" (
    echo ✅ 数据目录存在
    if exist "data\chewytta.mv.db" (
        echo ✅ 数据库文件存在
    ) else (
        echo ℹ️  数据库文件不存在（首次启动时会自动创建）
    )
) else (
    echo ℹ️  数据目录不存在（启动时会自动创建）
)

if exist "logs" (
    echo ✅ 日志目录存在
) else (
    echo ℹ️  日志目录不存在（启动时会自动创建）
)
echo.

:: 检查端口占用
echo [4/6] 检查端口状态...
netstat -an | find "8088" | find "LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 系统正在运行 (端口 8088 已监听)
    echo 🌐 访问地址: http://localhost:8088
) else (
    echo ℹ️  系统未运行 (端口 8088 未被占用)
)
echo.

:: 检查内存情况
echo [5/6] 检查系统资源...
for /f "skip=1" %%p in ('wmic OS get FreePhysicalMemory') do (
    if not "%%p"=="" (
        set /a "freeMB=%%p/1024"
        goto :memory_check_done
    )
)
:memory_check_done
if %freeMB% gtr 1024 (
    echo ✅ 可用内存充足: %freeMB% MB
) else (
    echo ⚠️  可用内存不足: %freeMB% MB （建议至少1GB）
)
echo.

:: 检查网络连接
echo [6/6] 检查网络连接...
ping localhost -n 1 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 本地网络正常
) else (
    echo ❌ 本地网络异常
)
echo.

:: 生成诊断报告
echo ========================================
echo 📋 诊断报告
echo ========================================
echo.

set "issues=0"

java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 问题 1: Java 环境未配置
    echo    解决方案: 安装 Java 17+ 运行环境
    set /a "issues+=1"
)

if not exist "Chewytta-0.0.1-SNAPSHOT.exe" if not exist "Chewytta-0.0.1-SNAPSHOT.jar" (
    echo ❌ 问题 2: 系统程序文件缺失
    echo    解决方案: 重新下载完整的程序包
    set /a "issues+=1"
)

if %freeMB% leq 512 (
    echo ⚠️  警告: 可用内存不足
    echo    建议: 关闭不必要的程序释放内存
    set /a "issues+=1"
)

if %issues% equ 0 (
    echo ✅ 系统检查完成，未发现问题！
    echo 💡 如果仍有问题，请检查防火墙设置
) else (
    echo ⚠️  发现 %issues% 个问题，请根据上述建议解决
)

echo.
echo 🌐 常用链接:
echo    Java下载: https://adoptium.net/
echo    项目主页: https://github.com/iKalous/Chewytta
echo.
echo 📞 如需技术支持，请提供此诊断报告的截图
echo.
pause

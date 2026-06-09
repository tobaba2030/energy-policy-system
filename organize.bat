@echo off
chcp 65001 >nul

echo ====================================
echo 文件整理脚本
echo ====================================
echo.

set "src=C:\Users\jianlinw\Desktop\个人照片文件20260508"
set "dst=C:\Users\jianlinw\Desktop\个人照片整理"

echo 正在创建目标文件夹...
if not exist "%dst%" mkdir "%dst%"
for %%A in (A B C D E) do (
    if not exist "%dst%\%%A" mkdir "%dst%\%%A"
)

echo.
echo 正在获取文件列表...
for /f "tokens=2" %%a in ('dir /s /a /-c "%src%\*.jpg" "%src%\*.png" "%src%\*.jpeg" 2^>nul ^| findstr /i "File(s)"') do set "total=%%a"

echo 文件大小: %total%
echo.
echo 开始整理（使用 robocopy 移动）...
echo.

robocopy "%src%" "%dst%\A" "*.jpg" "*.png" "*.jpeg" /MOV /E /NP /NFL /NDL /NC /NS /NJH /NJS /R:3 /W:5
echo A 完成

robocopy "%src%" "%dst%\B" "*.jpg" "*.png" "*.jpeg" /MOV /E /NP /NFL /NDL /NC /NS /NJH /NJS /R:3 /W:5
echo B 完成

robocopy "%src%" "%dst%\C" "*.jpg" "*.png" "*.jpeg" /MOV /E /NP /NFL /NDL /NC /NS /NJH /NJS /R:3 /W:5
echo C 完成

robocopy "%src%" "%dst%\D" "*.jpg" "*.png" "*.jpeg" /MOV /E /NP /NFL /NDL /NC /NS /NJH /NJS /R:3 /W:5
echo D 完成

robocopy "%src%" "%dst%\E" "*.jpg" "*.png" "*.jpeg" /MOV /E /NP /NFL /NDL /NC /NS /NJH /NJS /R:3 /W:5
echo E 完成

echo.
echo ====================================
echo 整理完成！
echo ====================================
echo 目标文件夹: %dst%
echo.
dir "%dst%" /b

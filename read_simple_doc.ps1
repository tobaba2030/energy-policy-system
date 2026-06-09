
$ErrorActionPreference = "Stop"

$sourceFile = "C:\Users\jianlinw\Desktop\AI工具专题材料\提示词汇总\AI+研究报告撰写流程.docx"
$destFile = "C:\AI学习资料\mesheer\ai_report_writing_process.docx"

Write-Host "检查源文件是否存在: $sourceFile"

if (Test-Path $sourceFile) {
    Copy-Item $sourceFile -Destination $destFile
    Write-Host "已复制文件到工作目录"
    
    $parentDir = "C:\Users\jianlinw\Desktop\AI工具专题材料"
    if (Test-Path $parentDir) {
        Write-Host "目录内容:"
        Get-ChildItem $parentDir | ForEach-Object { Write-Host "  - $($_.Name)" }
    }
} else {
    Write-Host "源文件不存在"
    
    $parentDir = "C:\Users\jianlinw\Desktop\AI工具专题材料"
    if (Test-Path $parentDir) {
        Write-Host "目录内容:"
        Get-ChildItem $parentDir | ForEach-Object { Write-Host "  - $($_.Name)" }
    }
}

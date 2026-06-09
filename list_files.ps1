
$desktopPath = [Environment]::GetFolderPath("Desktop")
Write-Host "Desktop路径: $desktopPath"

$targetPath = Join-Path $desktopPath "AI工具专题材料"
Write-Host "目标路径: $targetPath"

if (Test-Path $targetPath) {
    Write-Host ""
    Write-Host "目录内容:"
    Write-Host "------------"
    
    $items = Get-ChildItem $targetPath -Force
    foreach ($item in $items) {
        $type = if ($item.PSIsContainer) { "[DIR]" } else { "[FILE]" }
        Write-Host "$type $($item.Name)"
    }
    
    Write-Host ""
    Write-Host "尝试复制所有docx文件到工作目录..."
    $docxFiles = Get-ChildItem $targetPath -Filter "*.docx" -Recurse
    $workDir = "C:\AI学习资料\mesheer"
    
    foreach ($file in $docxFiles) {
        $destName = "ref_$($file.Name)"
        Copy-Item $file.FullName -Destination (Join-Path $workDir $destName)
        Write-Host "已复制: $($file.Name) -&gt; $destName"
    }
} else {
    Write-Host "目标目录不存在"
}

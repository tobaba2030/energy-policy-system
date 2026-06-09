$base = 'C:\Users\jianlinw\Desktop\个人照片整理'
$folders = @('A', 'B', 'C', 'D', 'E')

Write-Host '开始压缩文件...'
Write-Host ''

foreach ($f in $folders) {
    $src = Join-Path $base $f
    $zip = Join-Path $base (`$f + '.zip'`)
    
    Write-Host ('正在压缩文件夹 ' + `$f + '...'`)
    Compress-Archive -Path `$src'\*' -DestinationPath `$zip -Force
    
    $zipSize = [Math]::Round((Get-Item `$zip).Length / 1GB, 2)
    $srcSize = [Math]::Round((Get-ChildItem `$src -Recurse | Measure-Object -Property Length -Sum).Sum / 1GB, 2)
    $ratio = [Math]::Round((`$zipSize / `$srcSize) * 100, 1)
    
    Write-Host ('  压缩完成: ' + `$zipSize + ' GB (压缩率: ' + `$ratio + '%)'`)
    
    Write-Host ('  删除源文件夹...'`)
    Remove-Item `$src -Recurse -Force
    
    Write-Host ('  ' + `$f + ' 完成！'`)
    Write-Host ''
}

Write-Host '========================================'
Write-Host '全部压缩完成！'
Write-Host '========================================'
Write-Host ''
Write-Host '生成的压缩文件:'
Get-ChildItem `$base -Filter '*.zip' | ForEach-Object {
    $size = [Math]::Round($_.Length / 1GB, 2)
    Write-Host ('  ' + `$_.Name + ': ' + `$size + ' GB'`)
}
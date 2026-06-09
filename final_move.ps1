# File move script
$src = "C:\Users\jianlinw\Desktop\个人照片文件20260508"
$dst = "C:\Users\jianlinw\Desktop\个人照片整理"
$folders = @("A", "B", "C", "D", "E")

foreach ($f in $folders) {
    $path = Join-Path $dst $f
    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
    }
}

$all = Get-ChildItem $src -File -Recurse | Sort-Object Length -Descending
$total = ($all | Measure-Object -Property Length -Sum).Sum
$target = [Math]::Floor($total / 5)

Write-Host "=========================================="
Write-Host "文件整理脚本"
Write-Host "=========================================="
Write-Host ""
Write-Host "原文件夹: $src"
Write-Host "目标文件夹: $dst"
Write-Host ""
Write-Host "总文件数:" $all.Count
Write-Host "总容量:" ([Math]::Round($total/1GB, 2)) "GB"
Write-Host "每等分目标容量:" ([Math]::Round($target/1GB, 2)) "GB"
Write-Host ""

$g = @(@(), @(), @(), @(), @())
$s = @(0, 0, 0, 0, 0)

foreach ($f in $all) {
    $min = 0
    for ($i = 1; $i -lt 5; $i++) {
        if ($s[$i] -lt $s[$min]) { $min = $i }
    }
    $g[$min] += $f
    $s[$min] += $f.Length
}

Write-Host "开始移动文件..."
Write-Host ""
for ($i = 0; $i -lt 5; $i++) {
    $path = Join-Path $dst $folders[$i]
    $cnt = $g[$i].Count
    $sz = [Math]::Round($s[$i]/1GB, 2)
    Write-Host ("文件夹 " + $folders[$i] + ": " + $cnt + " 个文件, " + $sz + " GB")
    
    $c = 0
    foreach ($f in $g[$i]) {
        Move-Item $f.FullName -Destination $path -Force
        $c++
        if ($c % 200 -eq 0) {
            Write-Host ("  已移动 " + $c + " / " + $cnt)
        }
    }
}

Write-Host ""
Write-Host "=========================================="
Write-Host "整理完成！"
Write-Host "=========================================="
Write-Host ""
for ($i = 0; $i -lt 5; $i++) {
    $sz = [Math]::Round($s[$i]/1GB, 2)
    $pct = [Math]::Round(($s[$i] / $total) * 100, 1)
    Write-Host ("文件夹 " + $folders[$i] + ": " + $sz + " GB (" + $pct + " 百分比)")
}

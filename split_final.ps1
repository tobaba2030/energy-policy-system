$src = 'C:\Users\jianlinw\Desktop\个人照片文件20260508'
$dst = 'C:\Users\jianlinw\Desktop\个人照片整理'
$folders = @('A', 'B', 'C', 'D', 'E')
foreach ($f in $folders) { New-Item -ItemType Directory -Path (Join-Path $dst $f) -Force | Out-Null }
$all = Get-ChildItem $src -File -Recurse | Sort-Object Length -Descending
$total = ($all | Measure-Object -Property Length -Sum).Sum
Write-Host 'Total:' $all.Count 'files,' ([Math]::Round($total/1GB,2)) 'GB'
$g = @(@(), @(), @(), @(), @()); $s = @(0,0,0,0,0)
foreach ($f in $all) { $min = 0; for ($i = 1; $i -lt 5; $i++) { if ($s[$i] -lt $s[$min]) { $min = $i } }; $g[$min] += $f; $s[$min] += $f.Length }
for ($i = 0; $i -lt 5; $i++) { $path = Join-Path $dst $folders[$i]; Write-Host ('Moving to' + $folders[$i]); foreach ($f in $g[$i]) { Move-Item $f.FullName -Destination $path -Force } }
Write-Host 'Done'
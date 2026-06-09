Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxPath = "C:\Users\jianlinw\Desktop\考虑多元市场化及资源禀赋特征的电力交易关键技术研究与应用科技项目\研究报告\任务1报告1：适合公司发展的典型省份市场化交易路径设计.docx"

$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.Entries | Where-Object { $_.Name -eq 'document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

[xml]$xml = $content
$text = ""

foreach ($para in $xml.'w:document'.'w:body'.'w:p') {
    $t = ""
    foreach ($r in $para.'w:r') {
        if ($r.'w:t') {
            $t += $r.'w:t'
        }
    }
    if ($t.Trim()) {
        $text += $t + "`n"
    }
}

$text | Out-File -FilePath "C:\AI学习资料\mesheer\report_content.txt" -Encoding UTF8
Write-Host "文档内容已提取到 report_content.txt"
Write-Host "总字符数: $($text.Length)"

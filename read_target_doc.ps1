Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxPath = "C:\Users\jianlinw\Desktop\AI工具专题材料\AI+研究报告撰写流程V2.docx"

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

$text | Out-File -FilePath "C:\AI学习资料\mesheer\ai_report_writing_process.txt" -Encoding UTF8
Write-Host "文档内容已提取到 ai_report_writing_process.txt"
Write-Host "总字符数: $($text.Length)"

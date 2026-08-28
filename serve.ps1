# Lance un serveur local pour prévisualiser le site.
#   .\serve.ps1            -> http://localhost:8080
#   .\serve.ps1 -Port 3000 -> http://localhost:3000
#
# Le site est 100 % statique (HTML/CSS/JS) : ni WAMP, ni PHP, ni base de données.
# Ctrl+C pour arrêter.

param([int]$Port = 8080)

Set-Location $PSScriptRoot

$py = Get-Command python -ErrorAction SilentlyContinue
if (-not $py) { $py = Get-Command py -ErrorAction SilentlyContinue }

if ($py) {
    $url = "http://localhost:$Port"
    Write-Host ""
    Write-Host "  NexiBrain - serveur local" -ForegroundColor Cyan
    Write-Host "  $url" -ForegroundColor Green
    Write-Host "  $url/goalvision/"
    Write-Host "  $url/aura/"
    Write-Host ""
    Write-Host "  Ctrl+C pour arreter." -ForegroundColor DarkGray
    Write-Host ""
    Start-Process $url
    & $py.Source -m http.server $Port
} else {
    Write-Host "Python introuvable." -ForegroundColor Yellow
    Write-Host "Alternatives :"
    Write-Host "  npx serve .            (si Node.js est installe)"
    Write-Host "  VS Code : extension 'Live Server', clic droit sur index.html > Open with Live Server"
}

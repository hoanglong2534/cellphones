# 🚀 AR/VR Setup Script cho PL Store

Write-Host "🚀 Setting up AR/VR for PL Store..." -ForegroundColor Green

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

# Check if server is running
$serverRunning = Get-Process -Name "node" -ErrorAction SilentlyContinue
if (!$serverRunning) {
    Write-Host "🚀 Starting development server..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; npm start" -WindowStyle Normal
    Write-Host "⏳ Waiting for server to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
} else {
    Write-Host "✅ Development server is already running" -ForegroundColor Green
}

# Open browser
Write-Host "🌐 Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"
Start-Process "http://localhost:3000/ar-experience"

Write-Host ""
Write-Host "🎉 AR/VR Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Available routes:" -ForegroundColor Cyan
Write-Host "  • http://localhost:3000/ - Trang chủ" -ForegroundColor White
Write-Host "  • http://localhost:3000/ar-experience - AR/VR Experience" -ForegroundColor White
Write-Host "  • http://localhost:3000/ar-guide.html - Hướng dẫn AR/VR" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Cách sử dụng:" -ForegroundColor Cyan
Write-Host "  1. Tải marker Hiro từ: http://localhost:3000/ar-guide.html" -ForegroundColor White
Write-Host "  2. Vào trang AR/VR Experience" -ForegroundColor White
Write-Host "  3. Chọn sản phẩm và bấm 'Bắt đầu AR'" -ForegroundColor White
Write-Host "  4. Hướng camera vào marker" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Cyan
Write-Host "  • Sử dụng Chrome/Firefox để có trải nghiệm tốt nhất" -ForegroundColor White
Write-Host "  • Đảm bảo ánh sáng đủ khi sử dụng AR" -ForegroundColor White
Write-Host "  • In marker trên giấy A4 cho kết quả tốt nhất" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to continue..."

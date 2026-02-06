# diagnostic_pipes.ps1
# PowerShell script to discover named pipes that might belong to PyShiftAE
# Run this while After Effects is running with PyShiftAE loaded

Write-Host "=== PyShiftAE Named Pipe Diagnostic ===" -ForegroundColor Cyan
Write-Host "Scanning all named pipes..." -ForegroundColor Yellow

try {
    $allPipes = [System.IO.Directory]::GetFiles("\\.\pipe\")
    $relevantPipes = @()

    foreach ($pipe in $allPipes) {
        $pipeName = Split-Path $pipe -Leaf
        
        # Filter for likely PyShiftAE-related pipes
        if ($pipeName -match "Py|Shift|AE|CEPy|pyfx|aefx|PyShift|PyFX|AEFX|CEP|Adobe") {
            $relevantPipes += [PSCustomObject]@{
                Name = $pipeName
                FullPath = $pipe
                Type = "Likely PyShiftAE"
            }
        }
        # Also catch UUID-like patterns (common in Adobe extensions)
        elseif ($pipeName -match "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$") {
            $relevantPipes += [PSCustomObject]@{
                Name = $pipeName
                FullPath = $pipe
                Type = "UUID (possible Adobe extension)"
            }
        }
    }

    if ($relevantPipes.Count -gt 0) {
        Write-Host "`n=== RELEVANT PIPES FOUND ===" -ForegroundColor Green
        foreach ($pipe in $relevantPipes | Sort-Object Name) {
            Write-Host "• $($pipe.Name)" -ForegroundColor White
            Write-Host "  Path: $($pipe.FullPath)" -ForegroundColor Gray
            Write-Host "  Type: $($pipe.Type)" -ForegroundColor Gray
            Write-Host ""
        }
        
        Write-Host "`n=== NEXT STEPS ===" -ForegroundColor Cyan
        Write-Host "1. Try these pipe names in PyShiftBridge by setting localStorage:"
        Write-Host "   In browser console: localStorage.setItem('pyshift_pipe_name', '<pipe_name>');"
        Write-Host "2. Reload the CEP panel and check console for 'Pipe connected' message"
        Write-Host "3. If none work, PyShiftAE might not expose a pipe server"
    } else {
        Write-Host "`n=== NO RELEVANT PIPES FOUND ===" -ForegroundColor Red
        Write-Host "Possible reasons:"
        Write-Host "- PyShiftAE is not loaded/running"
        Write-Host "- PyShiftAE doesn't expose a named pipe"
        Write-Host "- Pipe name doesn't match our filters"
        Write-Host "`nShowing ALL pipes for manual inspection:" -ForegroundColor Yellow
        $allPipes | ForEach-Object { Write-Host "• $(Split-Path $_ -Leaf)" }
    }
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Try running PowerShell as Administrator" -ForegroundColor Yellow
}

Write-Host "`n=== TIPS ===" -ForegroundColor Cyan
Write-Host "- Run this script AFTER launching After Effects with PyShiftAE"
Write-Host "- Some pipes might appear/disappear dynamically"
Write-Host "- Check PyShiftAE documentation for pipe naming conventions"

# PowerShell script to update tool templates

# Get the root directory and template path
$rootDir = Split-Path -Parent $PSScriptRoot
$templatePath = Join-Path $rootDir "templates\tool-template.html"

Write-Host "Root directory: $rootDir"
Write-Host "Template path: $templatePath"

# Read the template file
try {
    $template = Get-Content -Path $templatePath -Raw
    Write-Host "✅ Template file loaded successfully"
} catch {
    Write-Host "❌ Error loading template file: $_"
    exit 1
}

# Function to convert filename to title case
function Get-TitleCase {
    param (
        [string]$text
    )
    return (Get-Culture).TextInfo.ToTitleCase($text.ToLower().Replace('-', ' '))
}

# Function to update a tool file
function Update-ToolFile {
    param (
        [string]$toolPath,
        [string]$toolName,
        [string]$toolDescription
    )
    
    try {
        Write-Host "`nProcessing: $toolPath"
        
        # Read existing content
        $existingContent = Get-Content -Path $toolPath -Raw
        Write-Host "- Read existing file content"
        
        # Create new content from template
        $newContent = $template
        
        # Replace placeholders
        $newContent = $newContent.Replace("TOOL_NAME", $toolName)
        $newContent = $newContent.Replace("TOOL_DESCRIPTION", $toolDescription)
        
        # Try to extract tool-specific content
        if ($existingContent -match '(?s)<!-- Tool specific content -->(.*?)<!-- End tool specific content -->') {
            Write-Host "- Found tool-specific content to preserve"
            $toolContent = $matches[1].Trim()
            $newContent = $newContent.Replace('<!-- This will be replaced with specific tool content -->', $toolContent)
        } else {
            Write-Host "- No tool-specific content found, using default template"
            # Try to extract main content
            if ($existingContent -match '(?s)<div[^>]*class="[^"]*tool-container[^"]*"[^>]*>(.*?)</div>') {
                $mainContent = $matches[1].Trim()
                $newContent = $newContent.Replace('<!-- This will be replaced with specific tool content -->', $mainContent)
            }
        }
        
        # Write updated content back to file
        Set-Content -Path $toolPath -Value $newContent -NoNewline
        Write-Host "✅ Successfully updated file"
        
    } catch {
        Write-Host "❌ Error updating $toolPath : $_"
    }
}

# Function to process directory
function Process-Directory {
    param (
        [string]$dirPath
    )
    
    Write-Host "`nProcessing directory: $dirPath"
    
    try {
        $items = Get-ChildItem -Path $dirPath
        $processedFiles = 0
        
        foreach ($item in $items) {
            if ($item.PSIsContainer -and -not $item.Name.StartsWith('.')) {
                # Process subdirectories
                Process-Directory $item.FullName
            } elseif ($item.Name -match '\.html$' -and $item.Name -ne 'tool-template.html') {
                # Process HTML files
                $toolName = Get-TitleCase $item.BaseName
                $toolDescription = "Free online $($toolName.ToLower()) tool"
                Update-ToolFile $item.FullName $toolName $toolDescription
                $processedFiles++
            }
        }
        
        Write-Host "Processed $processedFiles files in $dirPath"
        
    } catch {
        Write-Host "❌ Error processing directory $dirPath : $_"
    }
}

# Start processing
Write-Host "🔄 Starting template update process..."
Process-Directory $PSScriptRoot
Write-Host "✨ Template update process completed!" 
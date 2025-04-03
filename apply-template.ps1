# PowerShell script to apply template to all tools
$templatePath = "templates/tool-template.html"
$toolsData = @{
    "image-tools" = @(
        @{
            "name" = "All in One Conversions"
            "description" = "Convert images between different formats with our all-in-one image conversion tool"
            "file" = "all-in-one-conversions.html"
            "steps" = @(
                "Upload your image file",
                "Choose your desired output format",
                "Click Convert and download your converted image"
            )
        },
        @{
            "name" = "Image to PNG Converter"
            "description" = "Convert any image format to PNG with high quality and transparency support"
            "file" = "image-to-png-converter.html"
            "steps" = @(
                "Upload your image file",
                "Adjust PNG settings if needed",
                "Download your converted PNG image"
            )
        },
        @{
            "name" = "Image to JPG Converter"
            "description" = "Convert images to JPG format with optimized quality and compression"
            "file" = "image-to-jpg-converter.html"
            "steps" = @(
                "Upload your image",
                "Adjust JPG quality settings",
                "Download your converted JPG image"
            )
        },
        @{
            "name" = "Image Resizer"
            "description" = "Resize your images while maintaining aspect ratio and quality"
            "file" = "image-resizer.html"
            "steps" = @(
                "Upload your image",
                "Set desired dimensions or percentage",
                "Download your resized image"
            )
        },
        @{
            "name" = "Image Compressor"
            "description" = "Compress images without significant quality loss"
            "file" = "image-compressor.html"
            "steps" = @(
                "Upload your image",
                "Choose compression level",
                "Download your compressed image"
            )
        },
        @{
            "name" = "Image Cropper"
            "description" = "Crop your images with precision using our interactive cropping tool"
            "file" = "image-cropper.html"
            "steps" = @(
                "Upload your image",
                "Select crop area",
                "Download your cropped image"
            )
        },
        @{
            "name" = "Convert Image to Base64"
            "description" = "Convert your images to Base64 format for web embedding"
            "file" = "convert-image-to-base64.html"
            "steps" = @(
                "Upload your image",
                "Choose encoding options",
                "Copy Base64 string or download file"
            )
        },
        @{
            "name" = "Convert WebP to PNG"
            "description" = "Convert WebP images to PNG format with high quality"
            "file" = "convert-webp-to-png.html"
            "steps" = @(
                "Upload your WebP image",
                "Adjust PNG settings",
                "Download your PNG image"
            )
        },
        @{
            "name" = "GIF Maker"
            "description" = "Create animated GIFs from images or video clips"
            "file" = "gif-maker.html"
            "steps" = @(
                "Upload images or video",
                "Adjust GIF settings",
                "Download your animated GIF"
            )
        },
        @{
            "name" = "QR Code Generator"
            "description" = "Generate QR codes for text, URLs, or contact information"
            "file" = "qr-code-generator.html"
            "steps" = @(
                "Enter your content",
                "Customize QR code appearance",
                "Download your QR code"
            )
        },
        @{
            "name" = "Screenshot to PDF Converter"
            "description" = "Convert screenshots or images to PDF format"
            "file" = "screenshot-to-pdf-converter.html"
            "steps" = @(
                "Upload your screenshots",
                "Arrange page order",
                "Download your PDF file"
            )
        }
    ),
    "tools" = @(
        @{
            "name" = "JSON Formatter"
            "description" = "Format and validate your JSON data with our easy-to-use JSON formatter tool"
            "file" = "json-formatter.html"
            "steps" = @(
                "Paste your JSON data",
                "Click Format to beautify your JSON",
                "Copy the formatted result or download it"
            )
        },
        @{
            "name" = "HTML to Markdown Converter"
            "description" = "Convert HTML code to Markdown format easily"
            "file" = "html-to-markdown.html"
            "steps" = @(
                "Paste your HTML code",
                "Click Convert",
                "Copy the Markdown output"
            )
        },
        @{
            "name" = "CSS Minifier"
            "description" = "Minify your CSS code to reduce file size"
            "file" = "css-minifier.html"
            "steps" = @(
                "Paste your CSS code",
                "Click Minify",
                "Copy the minified CSS"
            )
        },
        @{
            "name" = "JavaScript Minifier"
            "description" = "Minify your JavaScript code for better performance"
            "file" = "js-minifier.html"
            "steps" = @(
                "Paste your JavaScript code",
                "Click Minify",
                "Copy the minified code"
            )
        },
        @{
            "name" = "SQL Formatter"
            "description" = "Format your SQL queries for better readability"
            "file" = "sql-formatter.html"
            "steps" = @(
                "Paste your SQL query",
                "Click Format",
                "Copy the formatted SQL"
            )
        },
        @{
            "name" = "HTACCESS Redirect Generator"
            "description" = "Generate .htaccess redirect rules easily"
            "file" = "htaccess.html"
            "steps" = @(
                "Enter redirect details",
                "Choose redirect type",
                "Copy the generated rules"
            )
        },
        @{
            "name" = "Markdown to HTML Converter"
            "description" = "Convert Markdown text to HTML format"
            "file" = "markdown-to-html.html"
            "steps" = @(
                "Paste your Markdown text",
                "Click Convert",
                "Copy the HTML output"
            )
        },
        @{
            "name" = "Color Code Picker"
            "description" = "Pick and convert colors between different formats"
            "file" = "color-picker.html"
            "steps" = @(
                "Choose a color",
                "Select output format",
                "Copy the color code"
            )
        },
        @{
            "name" = "Base64 Encoder & Decoder"
            "description" = "Encode and decode Base64 strings"
            "file" = "base64.html"
            "steps" = @(
                "Enter your text",
                "Choose encode or decode",
                "Copy the result"
            )
        },
        @{
            "name" = "IP Address Lookup"
            "description" = "Look up information about any IP address"
            "file" = "ip-lookup.html"
            "steps" = @(
                "Enter an IP address",
                "Click Lookup",
                "View detailed information"
            )
        }
    )
}

# Create directories if they don't exist
$directories = @("tools", "image-tools", "js", "css")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir
    }
}

# Function to apply template to a tool
function Apply-Template {
    param (
        [string]$category,
        [hashtable]$toolInfo
    )
    
    $outputPath = Join-Path $category $toolInfo.file
    $content = Get-Content $templatePath -Raw
    
    # Replace placeholders
    $content = $content.Replace("TOOL_NAME", $toolInfo.name)
    $content = $content.Replace("TOOL_DESCRIPTION", $toolInfo.description)
    $content = $content.Replace("STEP_1", $toolInfo.steps[0])
    $content = $content.Replace("STEP_2", $toolInfo.steps[1])
    $content = $content.Replace("STEP_3", $toolInfo.steps[2])
    $content = $content.Replace("TOOL_JS_FILE", [System.IO.Path]::GetFileNameWithoutExtension($toolInfo.file))
    
    # Create tool-specific JS file
    $jsFileName = Join-Path "js" ([System.IO.Path]::GetFileNameWithoutExtension($toolInfo.file) + ".js")
    if (-not (Test-Path $jsFileName)) {
        "// JavaScript code for $($toolInfo.name)" | Out-File $jsFileName -Encoding UTF8
    }
    
    # Save the modified template
    $content | Out-File $outputPath -Encoding UTF8
    Write-Host "Created $outputPath"
}

# Process all tools
foreach ($category in $toolsData.Keys) {
    foreach ($tool in $toolsData[$category]) {
        Apply-Template -category $category -toolInfo $tool
    }
}

Write-Host "Template application complete!" 
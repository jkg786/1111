@echo off
setlocal enabledelayedexpansion

REM Create directories if they don't exist
mkdir tools 2>nul
mkdir image-tools 2>nul
mkdir js 2>nul
mkdir css 2>nul

REM Image Tools
set "category=image-tools"
call :create_tool "All in One Conversions" "Convert images between different formats with our all-in-one image conversion tool" "all-in-one-conversions.html"
call :create_tool "Image to PNG Converter" "Convert any image format to PNG with high quality and transparency support" "image-to-png-converter.html"
call :create_tool "Image to JPG Converter" "Convert images to JPG format with optimized quality and compression" "image-to-jpg-converter.html"
call :create_tool "Image Resizer" "Resize your images while maintaining aspect ratio and quality" "image-resizer.html"
call :create_tool "Image Compressor" "Compress images without significant quality loss" "image-compressor.html"
call :create_tool "Image Cropper" "Crop your images with precision using our interactive cropping tool" "image-cropper.html"
call :create_tool "Convert Image to Base64" "Convert your images to Base64 format for web embedding" "convert-image-to-base64.html"
call :create_tool "Convert WebP to PNG" "Convert WebP images to PNG format with high quality" "convert-webp-to-png.html"
call :create_tool "GIF Maker" "Create animated GIFs from images or video clips" "gif-maker.html"
call :create_tool "QR Code Generator" "Generate QR codes for text, URLs, or contact information" "qr-code-generator.html"
call :create_tool "Screenshot to PDF Converter" "Convert screenshots or images to PDF format" "screenshot-to-pdf-converter.html"

REM Developer Tools
set "category=tools"
call :create_tool "JSON Formatter" "Format and validate your JSON data with our easy-to-use JSON formatter tool" "json-formatter.html"
call :create_tool "HTML to Markdown Converter" "Convert HTML code to Markdown format easily" "html-to-markdown.html"
call :create_tool "CSS Minifier" "Minify your CSS code to reduce file size" "css-minifier.html"
call :create_tool "JavaScript Minifier" "Minify your JavaScript code for better performance" "js-minifier.html"
call :create_tool "SQL Formatter" "Format your SQL queries for better readability" "sql-formatter.html"
call :create_tool "HTACCESS Redirect Generator" "Generate .htaccess redirect rules easily" "htaccess.html"
call :create_tool "Markdown to HTML Converter" "Convert Markdown text to HTML format" "markdown-to-html.html"
call :create_tool "Color Code Picker" "Pick and convert colors between different formats" "color-picker.html"
call :create_tool "Base64 Encoder & Decoder" "Encode and decode Base64 strings" "base64.html"
call :create_tool "IP Address Lookup" "Look up information about any IP address" "ip-lookup.html"

echo Template application complete!
goto :eof

:create_tool
set "name=%~1"
set "desc=%~2"
set "file=%~3"
set "jsname=%~n3"

REM Create tool file from template
type templates\tool-template.html > "%category%\%file%"

REM Create JS file if it doesn't exist
if not exist "js\%jsname%.js" (
    echo // JavaScript code for %name% > "js\%jsname%.js"
)

REM Replace placeholders in the tool file
powershell -Command "(Get-Content '%category%\%file%') -replace 'TOOL_NAME', '%name%' -replace 'TOOL_DESCRIPTION', '%desc%' -replace 'TOOL_JS_FILE', '%jsname%' | Set-Content '%category%\%file%'"

echo Created %category%\%file%
goto :eof 
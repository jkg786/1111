// Template Manager Script
const fs = require('fs');
const path = require('path');

// Get the root directory (parent of tools directory)
const rootDir = path.resolve(__dirname, '..');
const templatePath = path.join(rootDir, 'templates', 'tool-template.html');

console.log('Root directory:', rootDir);
console.log('Template path:', templatePath);

let template;

try {
    template = fs.readFileSync(templatePath, 'utf8');
    console.log('✅ Template file loaded successfully');
} catch (error) {
    console.error('❌ Error loading template file:', error);
    process.exit(1);
}

// Function to update a tool file with the new template
function updateToolFile(toolPath, toolName, toolDescription) {
    try {
        console.log(`\nProcessing: ${toolPath}`);
        
        // Read the existing tool file to preserve any specific content
        const existingContent = fs.readFileSync(toolPath, 'utf8');
        console.log('- Read existing file content');
        
        // Create the new content from template
        let newContent = template;
        
        // Replace placeholders
        newContent = newContent.replace(/TOOL_NAME/g, toolName);
        newContent = newContent.replace(/TOOL_DESCRIPTION/g, toolDescription);
        
        // Try to extract and preserve the tool-specific content
        const toolSpecificContent = extractToolContent(existingContent);
        if (toolSpecificContent) {
            console.log('- Found tool-specific content to preserve');
            newContent = newContent.replace('<!-- This will be replaced with specific tool content -->', toolSpecificContent);
        } else {
            console.log('- No tool-specific content found, using default template');
            // If no specific content found, try to extract the main tool content
            const mainContent = extractMainContent(existingContent);
            if (mainContent) {
                newContent = newContent.replace('<!-- This will be replaced with specific tool content -->', mainContent);
            }
        }
        
        // Write the updated content back to the file
        fs.writeFileSync(toolPath, newContent, 'utf8');
        console.log('✅ Successfully updated file');
        
    } catch (error) {
        console.error(`❌ Error updating ${toolPath}:`, error);
    }
}

// Function to extract tool-specific content from existing file
function extractToolContent(content) {
    // First try with specific markers
    const startMarker = '<!-- Tool specific content -->';
    const endMarker = '<!-- End tool specific content -->';
    
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);
    
    if (startIndex !== -1 && endIndex !== -1) {
        return content.substring(startIndex + startMarker.length, endIndex).trim();
    }
    
    return null;
}

// Function to extract main content when no specific markers found
function extractMainContent(content) {
    try {
        // Try to find the main tool content area
        const mainContentRegex = /<div[^>]*class="[^"]*tool-container[^"]*"[^>]*>([\s\S]*?)<\/div>/i;
        const match = content.match(mainContentRegex);
        
        if (match && match[1]) {
            return match[1].trim();
        }
        
        // If not found, try to find content between main tags
        const mainTagRegex = /<main[^>]*>([\s\S]*?)<\/main>/i;
        const mainMatch = content.match(mainTagRegex);
        
        if (mainMatch && mainMatch[1]) {
            return mainMatch[1].trim();
        }
        
        return null;
    } catch (error) {
        console.error('Error extracting main content:', error);
        return null;
    }
}

// Function to process all tools in a directory
function processToolsDirectory(dirPath) {
    console.log(`\nProcessing directory: ${dirPath}`);
    
    try {
        const items = fs.readdirSync(dirPath);
        let processedFiles = 0;
        
        items.forEach(item => {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !item.startsWith('.')) {
                // Recursively process subdirectories
                processToolsDirectory(fullPath);
            } else if (item.endsWith('.html') && item !== 'tool-template.html') {
                // Process HTML files
                const toolName = path.basename(item, '.html')
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                    
                const toolDescription = `Free online ${toolName.toLowerCase()} tool`; // You can customize this
                updateToolFile(fullPath, toolName, toolDescription);
                processedFiles++;
            }
        });
        
        console.log(`Processed ${processedFiles} files in ${dirPath}`);
        
    } catch (error) {
        console.error(`❌ Error processing directory ${dirPath}:`, error);
    }
}

// Start processing from the tools directory
console.log('🔄 Starting template update process...');
processToolsDirectory(__dirname);
console.log('✨ Template update process completed!'); 
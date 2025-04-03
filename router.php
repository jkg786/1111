<?php
// Load tool configurations
$tools = require_once 'config/tools.php';

// Get tool information from URL parameters
$toolId = $_GET['tool'] ?? '';
$category = $_GET['category'] ?? 'tools';

// Load template
$template = file_get_contents('templates/tool-template.html');

// Get tool configuration
$toolConfig = $tools[$category][$toolId] ?? null;

if ($toolConfig) {
    // Replace placeholders in template
    $template = str_replace('TOOL_NAME', $toolConfig['name'], $template);
    $template = str_replace('TOOL_DESCRIPTION', $toolConfig['description'], $template);
    $template = str_replace('STEP_1', $toolConfig['steps'][0], $template);
    $template = str_replace('STEP_2', $toolConfig['steps'][1], $template);
    $template = str_replace('STEP_3', $toolConfig['steps'][2], $template);
    $template = str_replace('TOOL_JS_FILE', $toolId, $template);

    // Replace related tools
    $relatedToolsHtml = '';
    foreach ($toolConfig['related'] as $relatedToolId) {
        foreach ($tools as $cat => $catTools) {
            if (isset($catTools[$relatedToolId])) {
                $relatedTool = $catTools[$relatedToolId];
                $relatedToolsHtml .= sprintf(
                    '<li class="list-group-item">
                        <i class="fas fa-chevron-right"></i>
                        <a href="%s/%s.html">%s</a>
                    </li>',
                    $cat,
                    $relatedToolId,
                    $relatedTool['name']
                );
                break;
            }
        }
    }
    $template = str_replace(
        '<li class="list-group-item">
                                <i class="fas fa-chevron-right"></i>
                                <a href="RELATED_TOOL_1.html">Related Tool 1</a>
                            </li>
                            <li class="list-group-item">
                                <i class="fas fa-chevron-right"></i>
                                <a href="RELATED_TOOL_2.html">Related Tool 2</a>
                            </li>',
        $relatedToolsHtml,
        $template
    );
    
    // Output the processed template
    echo $template;
} else {
    // Tool not found
    header("HTTP/1.0 404 Not Found");
    echo "Tool not found";
}
?> 
// Tool Categories Data
const toolCategories = [
    {
        id: 'image-tools',
        name: 'Image Tools',
        icon: 'fas fa-image',
        logo: 'images/categories/image-tools.png',
        description: 'Convert, resize, and optimize your images',
        tools: [
            { name: 'Image to PNG', url: 'tools/image-to-png.html', icon: 'fas fa-file-image' },
            { name: 'Image to JPG', url: 'tools/image-to-jpg.html', icon: 'fas fa-file-image' },
            { name: 'Image Resizer', url: 'tools/image-resizer.html', icon: 'fas fa-expand-arrows-alt' },
            { name: 'Image Optimizer', url: 'tools/image-optimizer.html', icon: 'fas fa-compress-arrows-alt' }
        ]
    },
    {
        id: 'text-tools',
        name: 'Text Tools',
        icon: 'fas fa-font',
        logo: 'images/categories/text-tools.png',
        description: 'Transform and analyze your text',
        tools: [
            { name: 'Text to Speech', url: 'tools/text-to-speech.html', icon: 'fas fa-microphone' },
            { name: 'Word Counter', url: 'tools/word-counter.html', icon: 'fas fa-calculator' },
            { name: 'Case Converter', url: 'tools/case-converter.html', icon: 'fas fa-exchange-alt' },
            { name: 'Text Formatter', url: 'tools/text-formatter.html', icon: 'fas fa-align-left' }
        ]
    },
    {
        id: 'seo-tools',
        name: 'SEO Tools',
        icon: 'fas fa-search',
        logo: 'images/categories/seo-tools.png',
        description: 'Optimize your website for search engines',
        tools: [
            { name: 'Keyword Analyzer', url: 'tools/keyword-analyzer.html', icon: 'fas fa-chart-line' },
            { name: 'Meta Tag Generator', url: 'tools/meta-tag-generator.html', icon: 'fas fa-tags' },
            { name: 'Sitemap Generator', url: 'tools/sitemap-generator.html', icon: 'fas fa-sitemap' },
            { name: 'SEO Checker', url: 'tools/seo-checker.html', icon: 'fas fa-search-plus' }
        ]
    },
    {
        id: 'developer-tools',
        name: 'Developer Tools',
        icon: 'fas fa-code',
        logo: 'images/categories/developer-tools.png',
        description: 'Essential tools for developers',
        tools: [
            { name: 'Code Formatter', url: 'tools/code-formatter.html', icon: 'fas fa-code' },
            { name: 'JSON Validator', url: 'tools/json-validator.html', icon: 'fas fa-check-circle' },
            { name: 'Base64 Encoder', url: 'tools/base64-encoder.html', icon: 'fas fa-lock' },
            { name: 'Regex Tester', url: 'tools/regex-tester.html', icon: 'fas fa-terminal' }
        ]
    },
    {
        id: 'calculator-tools',
        name: 'Calculator Tools',
        icon: 'fas fa-calculator',
        logo: 'images/categories/calculator-tools.png',
        description: 'Various calculation tools',
        tools: [
            { name: 'Unit Converter', url: 'tools/unit-converter.html', icon: 'fas fa-exchange-alt' },
            { name: 'Scientific Calculator', url: 'tools/scientific-calculator.html', icon: 'fas fa-square-root-alt' },
            { name: 'Percentage Calculator', url: 'tools/percentage-calculator.html', icon: 'fas fa-percentage' },
            { name: 'Date Calculator', url: 'tools/date-calculator.html', icon: 'fas fa-calendar-alt' }
        ]
    }
];

// Load Tool Categories
function loadToolCategories() {
    const categoriesContainer = document.getElementById('toolCategories');
    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = toolCategories.map(category => `
        <div class="col-md-4 col-lg-3">
            <div class="tool-category-card" data-category="${category.id}">
                <img src="${category.logo}" alt="${category.name}" class="category-logo mb-3">
                <i class="${category.icon} tool-category-icon"></i>
                <h3>${category.name}</h3>
                <p class="text-muted">${category.description}</p>
                <div class="tool-count">${category.tools.length} tools</div>
            </div>
        </div>
    `).join('');

    // Add click event listeners
    document.querySelectorAll('.tool-category-card').forEach(card => {
        card.addEventListener('click', () => {
            const categoryId = card.dataset.category;
            const category = toolCategories.find(c => c.id === categoryId);
            if (category) {
                showCategoryTools(category);
            }
        });
    });
}

// Show Category Tools
function showCategoryTools(category) {
    const toolsContainer = document.createElement('div');
    toolsContainer.className = 'category-tools mt-4';
    
    toolsContainer.innerHTML = `
        <div class="category-header mb-4">
            <img src="${category.logo}" alt="${category.name}" class="category-logo-large me-3">
            <div>
                <h3>${category.name}</h3>
                <p class="text-muted">${category.description}</p>
            </div>
        </div>
        <div class="row g-4">
            ${category.tools.map(tool => `
                <div class="col-md-4">
                    <div class="tool-card">
                        <a href="${tool.url}" class="text-decoration-none">
                            <i class="${tool.icon} tool-icon"></i>
                            <h5>${tool.name}</h5>
                        </a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    const existingTools = document.querySelector('.category-tools');
    if (existingTools) {
        existingTools.remove();
    }

    document.querySelector('.tool-categories').appendChild(toolsContainer);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadToolCategories();
}); 
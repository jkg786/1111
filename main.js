// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Language Switching
const languageSelector = document.getElementById('languageSelector');
const savedLanguage = localStorage.getItem('language') || 'en';
languageSelector.value = savedLanguage;

languageSelector.addEventListener('change', (e) => {
    const newLanguage = e.target.value;
    localStorage.setItem('language', newLanguage);
    translatePage(newLanguage);
});

// Tool Categories Data
const toolCategories = {
    'Image Tools': {
        icon: '🖼️',
        tools: [
            { name: 'Image to PNG Converter', url: 'tools/image-to-png.html', icon: 'image-to-png.svg' },
            { name: 'Image to JPG Converter', url: 'tools/image-to-jpg.html', icon: 'image-to-jpg.svg' },
            { name: 'Image Resizer', url: 'tools/image-resizer.html', icon: 'image-resizer.svg' },
            { name: 'Image Compressor', url: 'tools/image-compressor.html', icon: 'image-compressor.svg' },
            { name: 'Image Cropper', url: 'tools/image-cropper.html', icon: 'image-cropper.svg' },
            { name: 'Convert Image to Base64', url: 'tools/image-to-base64.html', icon: 'image-to-base64.svg' },
            { name: 'Convert WebP to PNG', url: 'tools/webp-to-png.html', icon: 'webp-to-png.svg' },
            { name: 'GIF Maker', url: 'tools/gif-maker.html', icon: 'gif-maker.svg' },
            { name: 'QR Code Generator', url: 'tools/qr-code-generator.html', icon: 'qr-code.svg' },
            { name: 'Screenshot to PDF Converter', url: 'tools/screenshot-to-pdf.html', icon: 'screenshot-to-pdf.svg' }
        ]
    },
    'SEO Tools': {
        icon: '🔍',
        tools: [
            { name: 'Meta Tag Generator', url: 'tools/meta-tag-generator.html', icon: 'meta-tag.svg' },
            { name: 'Keyword Density Checker', url: 'tools/keyword-density.html', icon: 'keyword-density.svg' },
            { name: 'Sitemap Generator', url: 'tools/sitemap-generator.html', icon: 'sitemap.svg' },
            { name: 'Robots.txt Generator', url: 'tools/robots-txt.html', icon: 'robots-txt.svg' },
            { name: 'Google Index Checker', url: 'tools/google-index.html', icon: 'google-index.svg' },
            { name: 'Domain Authority Checker', url: 'tools/domain-authority.html', icon: 'domain-authority.svg' },
            { name: 'Backlink Checker', url: 'tools/backlink-checker.html', icon: 'backlink.svg' },
            { name: 'Page Speed Checker', url: 'tools/page-speed.html', icon: 'page-speed.svg' },
            { name: 'XML Sitemap Validator', url: 'tools/xml-validator.html', icon: 'xml-validator.svg' },
            { name: 'Mobile-Friendly Test', url: 'tools/mobile-friendly.html', icon: 'mobile-friendly.svg' }
        ]
    },
    // Add all other categories here...
};

// Load Tool Categories
function loadToolCategories() {
    const categoriesContainer = document.getElementById('toolCategories');
    categoriesContainer.innerHTML = Object.keys(toolCategories).map(category => `
        <div class="col-md-4 col-lg-3">
            <div class="tool-category-card" data-category="${category}">
                <i class="${toolCategories[category].icon} tool-category-icon"></i>
                <h3>${category}</h3>
                <p>${toolCategories[category].tools.length} tools</p>
            </div>
        </div>
    `).join('');

    // Add click event listeners
    document.querySelectorAll('.tool-category-card').forEach(card => {
        card.addEventListener('click', () => {
            const categoryName = card.querySelector('h3').textContent.replace(/[^\w\s]/g, '').trim();
            showCategoryTools(categoryName);
        });
    });
}

// Search Functionality
const toolSearch = document.getElementById('toolSearch');
const voiceSearch = document.getElementById('voiceSearch');

toolSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterTools(searchTerm);
});

// Voice Search
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceSearch.addEventListener('click', () => {
        recognition.start();
        voiceSearch.classList.add('active');
    });

    recognition.onresult = (event) => {
        const searchTerm = event.results[0][0].transcript.toLowerCase();
        toolSearch.value = searchTerm;
        filterTools(searchTerm);
    };

    recognition.onend = () => {
        voiceSearch.classList.remove('active');
    };
}

// Filter Tools
function filterTools(searchTerm) {
    const allTools = Object.values(toolCategories).flatMap(category => 
        category.tools.map(tool => ({
            ...tool,
            category: Object.keys(toolCategories).find(c => toolCategories[c].tools.includes(tool))
        }))
    );

    const filteredTools = allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.category?.toLowerCase().includes(searchTerm)
    );

    displaySearchResults(filteredTools);
}

// Display Search Results
function displaySearchResults(tools) {
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results mt-3';
    
    if (tools.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center">No tools found</p>';
    } else {
        resultsContainer.innerHTML = tools.map(tool => `
            <div class="search-result-item p-2">
                <a href="${tool.url}" class="text-decoration-none">
                    <h5>${tool.name}</h5>
                    <small class="text-muted">${tool.category}</small>
                </a>
            </div>
        `).join('');
    }

    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }

    toolSearch.parentNode.appendChild(resultsContainer);
}

// Show Category Tools
function showCategoryTools(categoryName) {
    const category = toolCategories[categoryName];
    if (!category) return;

    // Create modal for category tools
    const modal = document.createElement('div');
    modal.className = 'category-modal';
    modal.innerHTML = `
        <div class="category-modal-content">
            <div class="category-modal-header">
                <h2>${category.icon} ${categoryName}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="category-modal-body">
                <div class="tool-grid">
                    ${category.tools.map(tool => `
                        <a href="${tool.url}" class="tool-item">
                            <img src="images/tools/${tool.icon}" alt="${tool.name}" class="tool-icon">
                            <span>${tool.name}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Add close button functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Add animation to tool items in modal
    const toolItems = modal.querySelectorAll('.tool-item');
    toolItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.opacity = '0';
        item.style.animation = 'fadeInUp 0.5s ease forwards';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadToolCategories();
    translatePage(savedLanguage);

    // Add click event listeners to tool items
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const toolUrl = item.getAttribute('href');
            window.location.href = toolUrl;
        });
    });

    // Add hover effects to category cards
    const categoryCards = document.querySelectorAll('.tool-category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 16px var(--shadow-color)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px var(--shadow-color)';
        });
    });

    // Add animation to tool items
    const toolList = document.querySelectorAll('.tool-list');
    toolList.forEach(list => {
        const items = list.querySelectorAll('.tool-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.opacity = '0';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
        });
    });

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);

    // Remove loading overlay when page is fully loaded
    window.addEventListener('load', () => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    });

    // Handle Explore Tools buttons
    const exploreButtons = document.querySelectorAll('.explore-btn');
    
    // Add click event listener to each button
    exploreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hide the clicked button
            this.classList.add('hidden');
            
            // Get the collapse element
            const collapseId = this.getAttribute('data-bs-toggle');
            const collapseElement = document.querySelector(collapseId);
            
            // Show the tools
            if (collapseElement) {
                collapseElement.classList.add('show');
            }
        });
    });
});

// Add CSS for loading overlay
const style = document.createElement('style');
style.textContent = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }

    .loading-spinner {
        text-align: center;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid var(--border-color);
        border-top: 5px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .loading-spinner p {
        color: var(--text-color);
        font-size: 1rem;
        margin: 0;
    }
`;
document.head.appendChild(style);

// Add CSS for modal
style.textContent += `
    .category-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    }

    .category-modal-content {
        background: var(--card-bg);
        border-radius: 16px;
        width: 90%;
        max-width: 1200px;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
    }

    .category-modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .category-modal-header h2 {
        margin: 0;
        color: var(--text-color);
    }

    .close-modal {
        background: none;
        border: none;
        font-size: 2rem;
        color: var(--text-color);
        cursor: pointer;
        padding: 0.5rem;
        line-height: 1;
    }

    .category-modal-body {
        padding: 1.5rem;
    }

    .tool-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 768px) {
        .category-modal-content {
            width: 95%;
            margin: 1rem;
        }

        .tool-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Translation Function
function translatePage(language) {
    // This is a placeholder for translation functionality
    // In a real implementation, you would load translation files and update the content
    console.log(`Translating to ${language}`);
} 
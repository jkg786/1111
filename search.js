// Tool categories and their tools
const toolCategories = {
    '📄 PDF Tools': [
        // Organize PDF
        { name: 'Merge PDF', icon: 'merge-pdf.svg', description: 'Combine multiple PDF files into one' },
        { name: 'Split PDF', icon: 'split-pdf.svg', description: 'Split PDF into multiple files' },
        { name: 'Remove Pages', icon: 'remove-pages.svg', description: 'Remove pages from PDF' },
        { name: 'Extract Pages', icon: 'extract-pages.svg', description: 'Extract specific pages from PDF' },
        { name: 'Organize PDF', icon: 'organize-pdf.svg', description: 'Rearrange pages in PDF' },
        
        // Optimize PDF
        { name: 'Compress PDF', icon: 'compress-pdf.svg', description: 'Reduce PDF file size' },
        { name: 'Repair PDF', icon: 'repair-pdf.svg', description: 'Fix corrupted PDF files' },
        { name: 'OCR PDF', icon: 'ocr-pdf.svg', description: 'Convert scanned PDF to searchable text' },
        
        // Edit PDF
        { name: 'Rotate PDF', icon: 'rotate-pdf.svg', description: 'Rotate PDF pages' },
        { name: 'Add Page Numbers', icon: 'add-page-numbers.svg', description: 'Add page numbers to PDF' },
        { name: 'Add Watermark', icon: 'add-watermark.svg', description: 'Add text or image watermarks to PDF' },
        { name: 'Edit PDF', icon: 'edit-pdf.svg', description: 'Edit text and images in PDF' },
        
        // PDF Security
        { name: 'Unlock PDF', icon: 'unlock-pdf.svg', description: 'Remove password protection from PDF' },
        { name: 'Protect PDF', icon: 'protect-pdf.svg', description: 'Add password protection to PDF' },
        { name: 'Sign PDF', icon: 'sign-pdf.svg', description: 'Add digital signatures to PDF' },
        { name: 'Redact PDF', icon: 'redact-pdf.svg', description: 'Permanently remove sensitive information from PDF' },
        { name: 'Compare PDF', icon: 'compare-pdf.svg', description: 'Compare two PDF files and highlight differences' }
    ],
    '🖼️ Image Tools': [
        { name: 'Image to PNG Converter', icon: 'image-to-png.svg', description: 'Convert images to PNG format' },
        { name: 'Image to JPG Converter', icon: 'image-to-jpg.svg', description: 'Convert images to JPG format' },
        { name: 'Image Resizer', icon: 'image-resizer.svg', description: 'Resize images while maintaining quality' },
        { name: 'Image Compressor', icon: 'image-compressor.svg', description: 'Compress images to reduce file size' },
        { name: 'Image Cropper', icon: 'image-cropper.svg', description: 'Crop images to desired dimensions' },
        { name: 'Convert Image to Base64', icon: 'image-to-base64.svg', description: 'Convert images to Base64 format' },
        { name: 'Convert WebP to PNG', icon: 'webp-to-png.svg', description: 'Convert WebP images to PNG format' },
        { name: 'GIF Maker', icon: 'gif-maker.svg', description: 'Create animated GIFs from images' },
        { name: 'QR Code Generator', icon: 'qr-code.svg', description: 'Generate QR codes from text or URLs' },
        { name: 'Screenshot to PDF Converter', icon: 'screenshot-to-pdf.svg', description: 'Convert screenshots to PDF format' }
    ],
    '🔍 SEO Tools': [
        { name: 'Meta Tag Generator', icon: 'meta-tag.svg', description: 'Generate SEO-friendly meta tags' },
        { name: 'Keyword Density Checker', icon: 'keyword-density.svg', description: 'Analyze keyword density in content' },
        { name: 'Sitemap Generator', icon: 'sitemap.svg', description: 'Generate XML sitemaps for websites' },
        { name: 'Robots.txt Generator', icon: 'robots-txt.svg', description: 'Create robots.txt files' },
        { name: 'Google Index Checker', icon: 'google-index.svg', description: 'Check if pages are indexed by Google' },
        { name: 'Domain Authority Checker', icon: 'domain-authority.svg', description: 'Check domain authority score' },
        { name: 'Backlink Checker', icon: 'backlink.svg', description: 'Analyze website backlinks' },
        { name: 'Page Speed Checker', icon: 'page-speed.svg', description: 'Check website loading speed' },
        { name: 'XML Sitemap Validator', icon: 'xml-validator.svg', description: 'Validate XML sitemaps' },
        { name: 'Mobile-Friendly Test', icon: 'mobile-friendly.svg', description: 'Test mobile responsiveness' }
    ],
    '📝 Text Tools': [
        { name: 'Word Counter', icon: 'word-counter.svg', description: 'Count words in text' },
        { name: 'Character Counter', icon: 'character-counter.svg', description: 'Count characters in text' },
        { name: 'Case Converter', icon: 'case-converter.svg', description: 'Convert text case' },
        { name: 'Plagiarism Checker', icon: 'plagiarism.svg', description: 'Check text for plagiarism' },
        { name: 'Grammar Checker', icon: 'grammar.svg', description: 'Check grammar and spelling' },
        { name: 'Text-to-Speech', icon: 'text-to-speech.svg', description: 'Convert text to speech' },
        { name: 'Speech-to-Text', icon: 'speech-to-text.svg', description: 'Convert speech to text' },
        { name: 'URL Encoder & Decoder', icon: 'url-encoder.svg', description: 'Encode/decode URLs' },
        { name: 'Fancy Text Generator', icon: 'fancy-text.svg', description: 'Generate fancy text styles' },
        { name: 'Random Text Generator', icon: 'random-text.svg', description: 'Generate random text' }
    ],
    '💻 Developer Tools': [
        { name: 'JSON Formatter', icon: 'json-formatter.svg', description: 'Format JSON data' },
        { name: 'HTML to Markdown Converter', icon: 'html-to-markdown.svg', description: 'Convert HTML to Markdown' },
        { name: 'CSS Minifier', icon: 'css-minifier.svg', description: 'Minify CSS code' },
        { name: 'JavaScript Minifier', icon: 'js-minifier.svg', description: 'Minify JavaScript code' },
        { name: 'SQL Formatter', icon: 'sql-formatter.svg', description: 'Format SQL queries' },
        { name: 'HTACCESS Redirect Generator', icon: 'htaccess.svg', description: 'Generate redirect rules' },
        { name: 'Markdown to HTML Converter', icon: 'markdown-to-html.svg', description: 'Convert Markdown to HTML' },
        { name: 'Color Code Picker', icon: 'color-picker.svg', description: 'Pick and convert color codes' },
        { name: 'Base64 Encoder & Decoder', icon: 'base64.svg', description: 'Encode/decode Base64' },
        { name: 'IP Address Lookup', icon: 'ip-lookup.svg', description: 'Look up IP address information' }
    ],
    '🔢 Math & Calculators': [
        { name: 'Percentage Calculator', icon: 'percentage.svg', description: 'Calculate percentages' },
        { name: 'Age Calculator', icon: 'age.svg', description: 'Calculate age' },
        { name: 'BMI Calculator', icon: 'bmi.svg', description: 'Calculate Body Mass Index' },
        { name: 'Loan EMI Calculator', icon: 'loan.svg', description: 'Calculate loan EMI' },
        { name: 'Scientific Calculator', icon: 'scientific.svg', description: 'Advanced calculations' },
        { name: 'Discount Calculator', icon: 'discount.svg', description: 'Calculate discounts' },
        { name: 'Currency Converter', icon: 'currency.svg', description: 'Convert currencies' },
        { name: 'Time Zone Converter', icon: 'timezone.svg', description: 'Convert time zones' },
        { name: 'Binary to Decimal Converter', icon: 'binary.svg', description: 'Convert binary to decimal' },
        { name: 'Tip Calculator', icon: 'tip.svg', description: 'Calculate tips' },
        { name: 'RERA Index Calculator', icon: 'rera.svg', description: 'Calculate RERA index for real estate' },
        { name: 'HELOC Payment Calculator', icon: 'heloc.svg', description: 'Calculate Home Equity Line of Credit payments' },
        { name: 'Asphalt Calculator', icon: 'asphalt.svg', description: 'Calculate asphalt needed for paving' },
        { name: 'Laplace Transform Calculator', icon: 'laplace.svg', description: 'Calculate Laplace transforms' },
        { name: 'ACTF Calculator', icon: 'actf.svg', description: 'Calculate Actual Cash Flow' },
        { name: 'Fuel Consumption Calculator', icon: 'fuel-consumption.svg', description: 'Calculate vehicle fuel consumption' },
        { name: 'Inside IR35 Calculator', icon: 'ir35.svg', description: 'Calculate IR35 tax implications' },
        { name: 'Novated Lease Calculator', icon: 'novated.svg', description: 'Calculate novated lease payments' },
        { name: 'FTV Calculator', icon: 'ftv.svg', description: 'Calculate Future Trade Value' },
        { name: 'Land Loan Calculator', icon: 'land-loan.svg', description: 'Calculate land loan payments' },
        { name: 'Zerodha Margin Calculator', icon: 'zerodha.svg', description: 'Calculate trading margins on Zerodha' },
        { name: 'End of Service Calculator', icon: 'eos.svg', description: 'Calculate end of service benefits' },
        { name: 'Gratuity Calculator Dubai', icon: 'gratuity-dubai.svg', description: 'Calculate Dubai gratuity payments' },
        { name: 'Gratuity Calculator', icon: 'gratuity.svg', description: 'Calculate gratuity payments' },
        { name: 'Compound Interest Calculator', icon: 'compound-interest.svg', description: 'Calculate compound interest (Calculadora Interés Compuesto)' }
    ],
    '📏 Unit Converters': [
        { name: 'Length Converter', icon: 'length.svg', description: 'Convert length units' },
        { name: 'Weight Converter', icon: 'weight.svg', description: 'Convert weight units' },
        { name: 'Speed Converter', icon: 'speed.svg', description: 'Convert speed units' },
        { name: 'Temperature Converter', icon: 'temperature.svg', description: 'Convert temperature units' },
        { name: 'Volume Converter', icon: 'volume.svg', description: 'Convert volume units' },
        { name: 'Data Storage Converter', icon: 'storage.svg', description: 'Convert data storage units' },
        { name: 'Energy Converter', icon: 'energy.svg', description: 'Convert energy units' },
        { name: 'Pressure Converter', icon: 'pressure.svg', description: 'Convert pressure units' },
        { name: 'Fuel Efficiency Converter', icon: 'fuel.svg', description: 'Convert fuel efficiency units' },
        { name: 'Angle Converter', icon: 'angle.svg', description: 'Convert angle units' }
    ],
    '🔒 Security & Encryption Tools': [
        { name: 'MD5 Hash Generator', icon: 'md5.svg', description: 'Generate MD5 hashes' },
        { name: 'SHA256 Hash Generator', icon: 'sha256.svg', description: 'Generate SHA256 hashes' },
        { name: 'Password Generator', icon: 'password.svg', description: 'Generate secure passwords' },
        { name: 'Random String Generator', icon: 'random-string.svg', description: 'Generate random strings' },
        { name: 'URL Shortener', icon: 'url-shortener.svg', description: 'Shorten long URLs' },
        { name: 'IP Geolocation Finder', icon: 'ip-geo.svg', description: 'Find IP geolocation' },
        { name: 'SSL Certificate Checker', icon: 'ssl.svg', description: 'Check SSL certificates' },
        { name: 'Whois Lookup', icon: 'whois.svg', description: 'Look up domain information' },
        { name: 'HTTP Headers Checker', icon: 'headers.svg', description: 'Check HTTP headers' },
        { name: 'Privacy Policy Generator', icon: 'privacy.svg', description: 'Generate privacy policies' }
    ],
    '📱 Social Media Tools': [
        { name: 'YouTube Thumbnail Downloader', icon: 'youtube-thumb.svg', description: 'Download YouTube thumbnails' },
        { name: 'Instagram Photo Downloader', icon: 'instagram.svg', description: 'Download Instagram photos' },
        { name: 'Twitter Video Downloader', icon: 'twitter-video.svg', description: 'Download Twitter videos' },
        { name: 'Facebook Video Downloader', icon: 'facebook-video.svg', description: 'Download Facebook videos' },
        { name: 'TikTok Video Downloader', icon: 'tiktok.svg', description: 'Download TikTok videos' },
        { name: 'YouTube Tags Extractor', icon: 'youtube-tags.svg', description: 'Extract YouTube video tags' },
        { name: 'Hashtag Generator', icon: 'hashtag.svg', description: 'Generate hashtags' },
        { name: 'Social Media Post Generator', icon: 'social-post.svg', description: 'Generate social media posts' },
        { name: 'Emoji Keyboard', icon: 'emoji.svg', description: 'Access emoji keyboard' },
        { name: 'Twitter Character Counter', icon: 'twitter-chars.svg', description: 'Count Twitter characters' }
    ],
    '🎯 Miscellaneous Tools': [
        { name: 'Barcode Generator', icon: 'barcode.svg', description: 'Generate barcodes' },
        { name: 'Meme Generator', icon: 'meme.svg', description: 'Create memes' },
        { name: 'Resume Builder', icon: 'resume.svg', description: 'Create professional resumes' },
        { name: 'Invoice Generator', icon: 'invoice.svg', description: 'Generate invoices' },
        { name: 'Business Name Generator', icon: 'business-name.svg', description: 'Generate business names' },
        { name: 'Lottery Number Generator', icon: 'lottery.svg', description: 'Generate lottery numbers' },
        { name: 'Flip a Coin Simulator', icon: 'coin.svg', description: 'Simulate coin flips' },
        { name: 'Random Number Generator', icon: 'random-number.svg', description: 'Generate random numbers' },
        { name: 'Dice Roller Simulator', icon: 'dice.svg', description: 'Roll virtual dice' },
        { name: 'Internet Speed Test', icon: 'speed-test.svg', description: 'Test internet speed' },
        { name: 'Daily Planner Creator', icon: 'daily-planner.svg', description: 'Create daily planners and schedules' },
        { name: 'Wedding Invitation Generator', icon: 'wedding.svg', description: 'Generate beautiful wedding invitations' },
        { name: 'Story Plot Generator', icon: 'story.svg', description: 'Generate creative story plots' },
        { name: 'E-book Creator', icon: 'ebook.svg', description: 'Create and format e-books' },
        { name: 'AI Chatbot Demo', icon: 'chatbot.svg', description: 'Try out AI chatbot capabilities' },
        { name: 'IP Address Tracker', icon: 'ip-tracker.svg', description: 'Track and locate IP addresses' },
        { name: 'Fake Address Generator', icon: 'address.svg', description: 'Generate fake addresses for testing' },
        { name: 'Calculator for Electric Bills', icon: 'electric.svg', description: 'Calculate electricity bills' },
        { name: 'Leap Year Checker', icon: 'calendar.svg', description: 'Check if a year is a leap year' },
        { name: 'Name to Numerology Calculator', icon: 'numerology.svg', description: 'Calculate numerological values of names' }
    ]
};

// Flatten all tools into a single array for searching
const allTools = Object.values(toolCategories).flat();

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('toolSearch');
    const searchButton = document.querySelector('.search-button');

    // Function to perform search
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            const matchingTools = allTools.filter(tool => 
                tool.name.toLowerCase().includes(query.toLowerCase()) ||
                tool.description.toLowerCase().includes(query.toLowerCase())
            );

            // Navigate to the first matching tool if found
            if (matchingTools.length > 0) {
                const toolSection = document.getElementById(matchingTools[0].name.toLowerCase().replace(/ /g, '-'));
                if (toolSection) {
                    toolSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                    // Add highlight effect
                    toolSection.classList.add('highlight-tool');
                    setTimeout(() => {
                        toolSection.classList.remove('highlight-tool');
                    }, 2000);
                }
            }
        }
    }

    // Search button click event
    searchButton.addEventListener('click', function() {
        performSearch();
    });

    // Enter key press event
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
});

// Search tools
function searchTools(searchTerm) {
    const results = [];
    Object.entries(toolCategories).forEach(([category, tools]) => {
        tools.forEach(tool => {
            if (tool.name.toLowerCase().includes(searchTerm) || 
                tool.description.toLowerCase().includes(searchTerm)) {
                results.push({ category, ...tool });
            }
        });
    });

    displaySearchResults(results);
}

// Display search results
function displaySearchResults(results) {
    const container = document.getElementById('searchResults');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<div class="search-result-item">No tools found</div>';
        return;
    }

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="images/tools/${result.icon}" alt="${result.name}" class="tool-icon me-3">
                <div>
                    <h5 class="mb-0">${result.name}</h5>
                    <small class="text-muted">${result.category}</small>
                    <p class="mb-0 small">${result.description}</p>
                </div>
            </div>
        `;
        container.appendChild(resultItem);
    });
} 
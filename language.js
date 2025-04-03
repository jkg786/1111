// Language System
const languages = {
    en: {
        name: 'English',
        code: 'en',
        nativeName: 'English'
    },
    es: {
        name: 'Spanish',
        code: 'es',
        nativeName: 'Español'
    },
    fr: {
        name: 'French',
        code: 'fr',
        nativeName: 'Français'
    },
    de: {
        name: 'German',
        code: 'de',
        nativeName: 'Deutsch'
    },
    it: {
        name: 'Italian',
        code: 'it',
        nativeName: 'Italiano'
    },
    pt: {
        name: 'Portuguese',
        code: 'pt',
        nativeName: 'Português'
    },
    ru: {
        name: 'Russian',
        code: 'ru',
        nativeName: 'Русский'
    },
    zh: {
        name: 'Chinese',
        code: 'zh',
        nativeName: '中文'
    },
    ja: {
        name: 'Japanese',
        code: 'ja',
        nativeName: '日本語'
    },
    ko: {
        name: 'Korean',
        code: 'ko',
        nativeName: '한국어'
    }
};

// Language selector functionality
class LanguageSelector {
    constructor() {
        this.container = document.getElementById('languageSelector');
        this.languages = {
            en: { native: 'English', english: 'English' },
            es: { native: 'Español', spanish: 'Spanish' },
            fr: { native: 'Français', english: 'French' },
            de: { native: 'Deutsch', english: 'German' },
            it: { native: 'Italiano', english: 'Italian' },
            pt: { native: 'Português', english: 'Portuguese' },
            ru: { native: 'Русский', english: 'Russian' },
            zh: { native: '中文', english: 'Chinese' },
            ja: { native: '日本語', english: 'Japanese' },
            ko: { native: '한국어', english: 'Korean' },
            ar: { native: 'العربية', english: 'Arabic' },
            hi: { native: 'हिन्दी', english: 'Hindi' },
            ur: { native: 'اردو', english: 'Urdu' }
            // Add more languages as needed
        };
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
        this.init();
    }

    init() {
        this.createLanguageSelector();
        this.setupEventListeners();
    }

    createLanguageSelector() {
        // Create container
        const container = document.createElement('div');
        container.className = 'language-selector-container me-2';

        // Create button
        const button = document.createElement('button');
        button.className = 'language-selector-btn';
        button.innerHTML = `
            <i class="fas fa-globe"></i>
            <span>${this.languages[this.currentLanguage].native}</span>
            <i class="fas fa-chevron-down ms-2"></i>
        `;

        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';

        // Add language options
        Object.entries(this.languages).forEach(([code, names]) => {
            const option = document.createElement('div');
            option.className = 'language-option';
            option.setAttribute('data-lang', code);
            option.innerHTML = `
                <span class="native-name">${names.native}</span>
                <span class="english-name">${names.english}</span>
            `;
            dropdown.appendChild(option);
        });

        // Assemble components
        container.appendChild(button);
        container.appendChild(dropdown);
        this.container.appendChild(container);
    }

    setupEventListeners() {
        const button = this.container.querySelector('.language-selector-btn');
        const dropdown = this.container.querySelector('.language-dropdown');
        const options = dropdown.querySelectorAll('.language-option');

        // Toggle dropdown
        button.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Handle language selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                const langCode = option.getAttribute('data-lang');
                this.changeLanguage(langCode);
                dropdown.classList.remove('show');
            });
        });
    }

    changeLanguage(langCode) {
        this.currentLanguage = langCode;
        localStorage.setItem('selectedLanguage', langCode);

        // Update button text
        const button = this.container.querySelector('.language-selector-btn span');
        button.textContent = this.languages[langCode].native;

        // Dispatch event for other components
        const event = new CustomEvent('languageChanged', {
            detail: { language: langCode }
        });
        document.dispatchEvent(event);

        // Reload page content in new language
        this.updatePageContent(langCode);
    }

    updatePageContent(langCode) {
        // Update page content based on selected language
        const translations = {
            en: {
                home: 'Home',
                about: 'About',
                contact: 'Contact',
                privacy: 'Privacy Policy',
                terms: 'Terms of Service',
                search: 'Search for tools...',
                categories: 'Tool Categories',
                featured: 'Featured Tools',
                aboutUs: 'About Us',
                quickLinks: 'Quick Links',
                connect: 'Connect With Us',
                rights: 'All rights reserved.'
            },
            es: {
                home: 'Inicio',
                about: 'Acerca de',
                contact: 'Contacto',
                privacy: 'Política de Privacidad',
                terms: 'Términos de Servicio',
                search: 'Buscar herramientas...',
                categories: 'Categorías de Herramientas',
                featured: 'Herramientas Destacadas',
                aboutUs: 'Sobre Nosotros',
                quickLinks: 'Enlaces Rápidos',
                connect: 'Conéctate con Nosotros',
                rights: 'Todos los derechos reservados.'
            }
            // Add more language translations
        };

        const t = translations[langCode] || translations.en;

        // Update navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === 'index.html') link.textContent = t.home;
            if (link.getAttribute('href') === 'about.html') link.textContent = t.about;
            if (link.getAttribute('href') === 'contact.html') link.textContent = t.contact;
        });

        // Update footer links
        document.querySelectorAll('.footer a').forEach(link => {
            if (link.getAttribute('href') === 'index.html') link.textContent = t.home;
            if (link.getAttribute('href') === 'about.html') link.textContent = t.about;
            if (link.getAttribute('href') === 'contact.html') link.textContent = t.contact;
            if (link.getAttribute('href') === 'privacy-policy.html') link.textContent = t.privacy;
            if (link.getAttribute('href') === 'terms.html') link.textContent = t.terms;
        });

        // Update search placeholder
        const searchInput = document.getElementById('toolSearch');
        if (searchInput) searchInput.placeholder = t.search;

        // Update headings
        document.querySelectorAll('h2').forEach(heading => {
            if (heading.textContent.includes('Tool Categories')) heading.textContent = t.categories;
            if (heading.textContent.includes('Featured Tools')) heading.textContent = t.featured;
        });

        // Update footer sections
        document.querySelectorAll('.footer h5').forEach(heading => {
            if (heading.textContent.includes('About Us')) heading.textContent = t.aboutUs;
            if (heading.textContent.includes('Quick Links')) heading.textContent = t.quickLinks;
            if (heading.textContent.includes('Connect With Us')) heading.textContent = t.connect;
        });

        // Update copyright
        const copyright = document.querySelector('.footer .text-center p');
        if (copyright) {
            copyright.textContent = `© ${new Date().getFullYear()} Toolsnew. ${t.rights}`;
        }
    }
}

// Initialize language selector when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSelector();
}); 
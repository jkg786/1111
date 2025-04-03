// Terms of Service translations
const termsTranslations = {
    en: {
        title: "Terms of Service",
        lastUpdated: "Last updated: March 15, 2024",
        sections: {
            acceptance: {
                title: "1. Acceptance of Terms",
                content: "By accessing and using Toolsnew, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website."
            },
            license: {
                title: "2. Use License",
                content: "Permission is granted to temporarily access and use Toolsnew for personal, non-commercial purposes only. This license does not include:",
                items: [
                    "Modifying or copying our materials",
                    "Using materials for commercial purposes",
                    "Attempting to decompile or reverse engineer our software",
                    "Removing any copyright or proprietary notations"
                ]
            },
            responsibilities: {
                title: "3. User Responsibilities",
                content: "When using our tools, you agree to:",
                items: [
                    "Provide accurate information",
                    "Not use our services for illegal purposes",
                    "Not interfere with the proper working of our website",
                    "Not attempt to gain unauthorized access to our systems"
                ]
            },
            disclaimer: {
                title: "4. Disclaimer",
                content: "Our tools are provided \"as is\" without any warranties, either express or implied. We do not guarantee that our tools will be error-free or uninterrupted."
            },
            limitations: {
                title: "5. Limitations",
                content: "In no event shall Toolsnew be liable for any damages arising out of the use or inability to use our tools, even if we have been notified of the possibility of such damages."
            },
            revisions: {
                title: "6. Revisions and Errata",
                content: "We reserve the right to update or change our terms at any time. Continued use of our website after such changes constitutes acceptance of the new terms."
            },
            contact: {
                title: "7. Contact Information",
                content: "If you have any questions about these Terms of Service, please contact us at:",
                email: "Email: terms@toolsnew.com"
            }
        }
    },
    es: {
        title: "Términos de Servicio",
        lastUpdated: "Última actualización: 15 de marzo de 2024",
        sections: {
            acceptance: {
                title: "1. Aceptación de los Términos",
                content: "Al acceder y utilizar Toolsnew, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, por favor no utilice nuestro sitio web."
            },
            license: {
                title: "2. Licencia de Uso",
                content: "Se otorga permiso para acceder y utilizar temporalmente Toolsnew solo para fines personales y no comerciales. Esta licencia no incluye:",
                items: [
                    "Modificar o copiar nuestros materiales",
                    "Usar materiales para fines comerciales",
                    "Intentar descompilar o ingeniería inversa de nuestro software",
                    "Eliminar cualquier notación de copyright o propiedad"
                ]
            },
            responsibilities: {
                title: "3. Responsabilidades del Usuario",
                content: "Al usar nuestras herramientas, usted acepta:",
                items: [
                    "Proporcionar información precisa",
                    "No usar nuestros servicios para fines ilegales",
                    "No interferir con el funcionamiento adecuado de nuestro sitio web",
                    "No intentar obtener acceso no autorizado a nuestros sistemas"
                ]
            },
            disclaimer: {
                title: "4. Descargo de Responsabilidad",
                content: "Nuestras herramientas se proporcionan \"tal cual\" sin garantías, ya sean expresas o implícitas. No garantizamos que nuestras herramientas estén libres de errores o sean ininterrumpidas."
            },
            limitations: {
                title: "5. Limitaciones",
                content: "En ningún caso Toolsnew será responsable por daños que surjan del uso o la imposibilidad de usar nuestras herramientas, incluso si hemos sido notificados de la posibilidad de tales daños."
            },
            revisions: {
                title: "6. Revisiones y Erratas",
                content: "Nos reservamos el derecho de actualizar o cambiar nuestros términos en cualquier momento. El uso continuo de nuestro sitio web después de tales cambios constituye la aceptación de los nuevos términos."
            },
            contact: {
                title: "7. Información de Contacto",
                content: "Si tiene alguna pregunta sobre estos Términos de Servicio, por favor contáctenos en:",
                email: "Correo electrónico: terms@toolsnew.com"
            }
        }
    }
    // Add more languages as needed
};

// Function to update the terms content based on selected language
function updateTermsContent(language) {
    const translations = termsTranslations[language] || termsTranslations.en;
    
    // Update title and last updated date
    document.querySelector('h1').textContent = translations.title;
    document.querySelector('.text-muted').textContent = translations.lastUpdated;
    
    // Update each section
    Object.keys(translations.sections).forEach(sectionKey => {
        const section = translations.sections[sectionKey];
        const sectionElement = document.querySelector(`section:nth-child(${Object.keys(translations.sections).indexOf(sectionKey) + 1})`);
        
        // Update section title
        sectionElement.querySelector('h2').textContent = section.title;
        
        // Update section content
        const contentElement = sectionElement.querySelector('p');
        if (contentElement) {
            contentElement.textContent = section.content;
        }
        
        // Update list items if they exist
        if (section.items) {
            const listItems = sectionElement.querySelectorAll('li');
            section.items.forEach((item, index) => {
                if (listItems[index]) {
                    listItems[index].textContent = item;
                }
            });
        }
        
        // Update email if it exists
        if (section.email) {
            const emailElement = sectionElement.querySelector('p:last-child');
            if (emailElement) {
                emailElement.textContent = section.email;
            }
        }
    });
}

// Initialize terms page
document.addEventListener('DOMContentLoaded', () => {
    // Get current language from localStorage or default to English
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Update content with current language
    updateTermsContent(currentLanguage);
    
    // Listen for language changes
    document.addEventListener('languageChanged', (event) => {
        updateTermsContent(event.detail.language);
    });
}); 
// Voice Search functionality
class VoiceSearch {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.voiceButton = document.getElementById('voiceSearch');
        this.searchInput = document.getElementById('toolSearch');
        this.setupSpeechRecognition();
        this.setupEventListeners();
    }

    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            // Get the current language from localStorage or default to 'en-US'
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            this.setRecognitionLanguage(currentLang);

            // Set up recognition event handlers
            this.recognition.onstart = () => this.handleRecognitionStart();
            this.recognition.onresult = (event) => this.handleRecognitionResult(event);
            this.recognition.onerror = (event) => this.handleRecognitionError(event);
            this.recognition.onend = () => this.handleRecognitionEnd();
        } else {
            console.log('Speech recognition not supported');
            this.voiceButton.style.display = 'none';
        }
    }

    setRecognitionLanguage(langCode) {
        // Map language codes to speech recognition codes
        const languageMap = {
            'en': 'en-US',
            'es': 'es-ES',
            'fr': 'fr-FR',
            'de': 'de-DE',
            'it': 'it-IT',
            'pt': 'pt-PT',
            'ru': 'ru-RU',
            'zh': 'zh-CN',
            'ja': 'ja-JP',
            'ko': 'ko-KR',
            'ar': 'ar-SA',
            'hi': 'hi-IN',
            'ur': 'ur-PK',
            // Add more language mappings as needed
        };

        this.recognition.lang = languageMap[langCode] || 'en-US';
    }

    setupEventListeners() {
        this.voiceButton.addEventListener('click', () => this.toggleListening());
        
        // Listen for language changes
        document.addEventListener('languageChanged', (event) => {
            this.setRecognitionLanguage(event.detail.language);
        });
    }

    toggleListening() {
        if (!this.isListening) {
            this.startListening();
        } else {
            this.stopListening();
        }
    }

    startListening() {
        try {
            this.recognition.start();
        } catch (error) {
            console.error('Speech recognition error:', error);
        }
    }

    stopListening() {
        try {
            this.recognition.stop();
        } catch (error) {
            console.error('Speech recognition error:', error);
        }
    }

    handleRecognitionStart() {
        this.isListening = true;
        this.voiceButton.classList.add('listening');
        this.voiceButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        
        // Add visual feedback
        this.addPulsingEffect();
    }

    handleRecognitionResult(event) {
        const transcript = event.results[0][0].transcript;
        this.searchInput.value = transcript;
        
        // Trigger the search
        this.performSearch(transcript);
    }

    handleRecognitionError(event) {
        console.error('Speech recognition error:', event.error);
        this.showErrorMessage(event.error);
    }

    handleRecognitionEnd() {
        this.isListening = false;
        this.voiceButton.classList.remove('listening');
        this.voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
        
        // Remove visual feedback
        this.removePulsingEffect();
    }

    performSearch(query) {
        // Get all tool cards
        const toolCards = document.querySelectorAll('.tool-category-card');
        
        // Filter tools based on the search query
        toolCards.forEach(card => {
            const toolName = card.querySelector('h3').textContent.toLowerCase();
            const toolDescription = card.querySelector('p').textContent.toLowerCase();
            const searchTerm = query.toLowerCase();
            
            if (toolName.includes(searchTerm) || toolDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    addPulsingEffect() {
        this.voiceButton.style.animation = 'pulse 1.5s infinite';
    }

    removePulsingEffect() {
        this.voiceButton.style.animation = '';
    }

    showErrorMessage(error) {
        const errorMessages = {
            'no-speech': 'No speech was detected. Please try again.',
            'audio-capture': 'No microphone was found. Ensure that a microphone is installed.',
            'not-allowed': 'Permission to use microphone was denied.',
            'network': 'Network error occurred.',
            'aborted': 'Speech recognition was aborted.',
            'language-not-supported': 'The language is not supported.'
        };

        const message = errorMessages[error] || 'An error occurred. Please try again.';
        
        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mt-2';
        errorDiv.textContent = message;
        
        this.searchInput.parentNode.appendChild(errorDiv);
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
}

// Initialize voice search when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VoiceSearch();
}); 
// Word Counter Tool JavaScript

// Get DOM elements
const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const sentenceCount = document.getElementById('sentenceCount');
const paragraphCount = document.getElementById('paragraphCount');

// Add event listener for text input
textInput.addEventListener('input', updateCounts);

// Function to update all counts
function updateCounts() {
    const text = textInput.value;
    
    // Update word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;
    
    // Update character count
    charCount.textContent = text.length;
    
    // Update sentence count
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    sentenceCount.textContent = sentences.length;
    
    // Update paragraph count
    const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0);
    paragraphCount.textContent = paragraphs.length;
}

// Function to clear text
function clearText() {
    textInput.value = '';
    updateCounts();
}

// Function to copy text
function copyText() {
    copyToClipboard(textInput.value);
}

// Initialize counts
updateCounts(); 
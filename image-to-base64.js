// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const resultContainer = document.getElementById('resultContainer');
const base64Result = document.getElementById('base64Result');
const previewImage = document.getElementById('previewImage');
const resultSize = document.getElementById('resultSize');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const outputFormat = document.getElementById('outputFormat');
const maxWidth = document.getElementById('maxWidth');
const maxHeight = document.getElementById('maxHeight');
const maintainAspect = document.getElementById('maintainAspect');

// State
let selectedFile = null;

// Event Listeners
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

convertBtn.addEventListener('click', convertToBase64);
clearBtn.addEventListener('click', clearAll);
copyBtn.addEventListener('click', copyToClipboard);
downloadBtn.addEventListener('click', downloadImage);

// Functions
function handleFiles(files) {
    if (files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
        showToast('Please select an image file', 'error');
        return;
    }

    selectedFile = file;
    updateFileInfo();
    document.querySelector('.conversion-options').style.display = 'block';
    document.querySelector('.selected-file').style.display = 'block';
    convertBtn.disabled = false;
    clearBtn.disabled = false;
}

function updateFileInfo() {
    fileInfo.innerHTML = `
        <div class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <i class="fas fa-image me-2"></i>
                ${selectedFile.name}
                <small class="text-muted ms-2">(${formatFileSize(selectedFile.size)})</small>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFile()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
}

function removeFile() {
    selectedFile = null;
    fileInfo.innerHTML = '';
    document.querySelector('.conversion-options').style.display = 'none';
    document.querySelector('.selected-file').style.display = 'none';
    resultContainer.style.display = 'none';
    convertBtn.disabled = true;
    clearBtn.disabled = true;
}

function updateButtons() {
    convertBtn.disabled = !selectedFile;
    clearBtn.disabled = !selectedFile;
}

function convertToBase64() {
    if (!selectedFile) return;

    showLoading(convertBtn);
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Apply max dimensions if specified
            if (maxWidth.value && width > maxWidth.value) {
                width = parseInt(maxWidth.value);
                if (maintainAspect.checked) {
                    height = Math.round((width * img.height) / img.width);
                }
            }

            if (maxHeight.value && height > maxHeight.value) {
                height = parseInt(maxHeight.value);
                if (maintainAspect.checked) {
                    width = Math.round((height * img.width) / img.height);
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to base64
            const base64String = canvas.toDataURL(selectedFile.type);
            const base64Content = outputFormat.value === 'base64' 
                ? base64String.split(',')[1] 
                : base64String;

            // Update UI
            base64Result.value = base64Content;
            previewImage.src = base64String;
            resultSize.textContent = formatFileSize(base64Content.length);
            resultContainer.style.display = 'block';
            hideLoading(convertBtn);
            showToast('Image converted successfully!', 'success');
        };
        img.src = e.target.result;
    };

    reader.onerror = () => {
        hideLoading(convertBtn);
        showToast('Error reading file', 'error');
    };

    reader.readAsDataURL(selectedFile);
}

function copyToClipboard() {
    base64Result.select();
    document.execCommand('copy');
    showToast('Copied to clipboard!', 'success');
}

function downloadImage() {
    const link = document.createElement('a');
    link.href = previewImage.src;
    link.download = `converted_${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearAll() {
    selectedFile = null;
    fileInfo.innerHTML = '';
    document.querySelector('.conversion-options').style.display = 'none';
    document.querySelector('.selected-file').style.display = 'none';
    resultContainer.style.display = 'none';
    base64Result.value = '';
    previewImage.src = '';
    resultSize.textContent = '0 KB';
    updateButtons();
    showToast('All cleared!', 'success');
}

// Helper Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
} 
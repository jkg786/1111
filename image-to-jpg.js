// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const resultContainer = document.getElementById('resultContainer');
const previewImage = document.getElementById('previewImage');
const resultSize = document.getElementById('resultSize');
const downloadBtn = document.getElementById('downloadBtn');
const quality = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const width = document.getElementById('width');
const height = document.getElementById('height');
const maintainAspect = document.getElementById('maintainAspect');
const backgroundColor = document.getElementById('backgroundColor');
const progressiveJpg = document.getElementById('progressiveJpg');
const optimizeWeb = document.getElementById('optimizeWeb');

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

quality.addEventListener('input', (e) => {
    qualityValue.textContent = `${e.target.value}%`;
});

convertBtn.addEventListener('click', convertToJPG);
clearBtn.addEventListener('click', clearAll);
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

function convertToJPG() {
    if (!selectedFile) return;

    showLoading(convertBtn);
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let newWidth = img.width;
            let newHeight = img.height;

            // Apply resize if specified
            if (width.value && height.value) {
                newWidth = parseInt(width.value);
                newHeight = parseInt(height.value);
                if (maintainAspect.checked) {
                    const ratio = Math.min(newWidth / img.width, newHeight / img.height);
                    newWidth = Math.round(img.width * ratio);
                    newHeight = Math.round(img.height * ratio);
                }
            }

            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');

            // Fill background color for transparent images
            ctx.fillStyle = backgroundColor.value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw image
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert to JPG with quality settings
            const qualityValue = quality.value / 100;
            const dataUrl = canvas.toDataURL('image/jpeg', qualityValue);

            // Update UI
            previewImage.src = dataUrl;
            resultSize.textContent = formatFileSize(dataUrl.length);
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

function downloadImage() {
    const link = document.createElement('a');
    link.href = previewImage.src;
    link.download = `converted_${selectedFile.name.replace(/\.[^/.]+$/, '')}.jpg`;
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
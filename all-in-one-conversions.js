// All in One Image Conversions Tool JavaScript

// Get DOM elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const resultContainer = document.getElementById('resultContainer');
const convertedImages = document.getElementById('convertedImages');
const outputFormat = document.getElementById('outputFormat');
const quality = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const width = document.getElementById('width');
const height = document.getElementById('height');
const maintainAspect = document.getElementById('maintainAspect');
const backgroundColor = document.getElementById('backgroundColor');
const preserveTransparency = document.getElementById('preserveTransparency');

// Store selected files
let selectedFiles = [];

// Drag and drop event handlers
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

// File input change handler
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Handle selected files
function handleFiles(files) {
    if (files.length === 0) return;
    
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            showToast('Please select only image files', 'error');
            return;
        }
        selectedFiles.push(file);
    });

    updateFileList();
    updateButtons();
}

// Update file list display
function updateFileList() {
    fileList.innerHTML = selectedFiles.map((file, index) => `
        <div class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <i class="fas fa-image me-2"></i>
                ${file.name}
                <small class="text-muted ms-2">(${formatFileSize(file.size)})</small>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFile(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// Remove file from selection
function removeFile(index) {
    selectedFiles.splice(index, 1);
    updateFileList();
    updateButtons();
}

// Update buttons state
function updateButtons() {
    convertBtn.disabled = selectedFiles.length === 0;
    clearBtn.disabled = selectedFiles.length === 0;
}

// Quality slider handler
quality.addEventListener('input', (e) => {
    qualityValue.textContent = `${e.target.value}%`;
});

// Maintain aspect ratio handler
maintainAspect.addEventListener('change', (e) => {
    if (e.target.checked) {
        height.disabled = true;
        height.value = '';
    } else {
        height.disabled = false;
    }
});

// Width input handler
width.addEventListener('input', (e) => {
    if (maintainAspect.checked && e.target.value) {
        const img = new Image();
        img.onload = () => {
            const aspectRatio = img.height / img.width;
            height.value = Math.round(e.target.value * aspectRatio);
        };
        if (selectedFiles.length > 0) {
            img.src = URL.createObjectURL(selectedFiles[0]);
        }
    }
});

// Convert button handler
convertBtn.addEventListener('click', convertImages);

// Clear button handler
clearBtn.addEventListener('click', clearAll);

// Convert images
function convertImages() {
    if (selectedFiles.length === 0) return;

    showLoading(convertBtn);
    convertedImages.innerHTML = '';
    resultContainer.style.display = 'block';

    selectedFiles.forEach((file, index) => {
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

                // Set background color if needed
                if (!preserveTransparency.checked || outputFormat.value === 'jpeg') {
                    ctx.fillStyle = backgroundColor.value;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                // Draw image
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Convert to desired format
                const mimeType = `image/${outputFormat.value}`;
                const qualityValue = quality.value / 100;
                const dataUrl = canvas.toDataURL(mimeType, qualityValue);

                // Create result card
                const col = document.createElement('div');
                col.className = 'col-md-6 col-lg-4';
                col.innerHTML = `
                    <div class="card">
                        <img src="${dataUrl}" class="card-img-top" alt="Converted image">
                        <div class="card-body">
                            <h6 class="card-title">${file.name}</h6>
                            <p class="card-text">
                                <small class="text-muted">Size: ${formatFileSize(dataUrl.length)}</small>
                            </p>
                            <a href="${dataUrl}" download="converted_${file.name}" class="btn btn-primary btn-sm">
                                <i class="fas fa-download"></i> Download
                            </a>
                        </div>
                    </div>
                `;
                convertedImages.appendChild(col);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    hideLoading(convertBtn);
    showToast('Images converted successfully!', 'success');
}

// Clear all
function clearAll() {
    selectedFiles = [];
    fileList.innerHTML = '';
    resultContainer.style.display = 'none';
    convertedImages.innerHTML = '';
    updateButtons();
    showToast('All cleared!', 'success');
}

// Helper functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Initialize
updateButtons(); 
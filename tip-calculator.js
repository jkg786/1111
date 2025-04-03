// Get DOM elements
const billAmountInput = document.getElementById('billAmount');
const tipPercentageInput = document.getElementById('tipPercentage');
const numberOfPeopleInput = document.getElementById('numberOfPeople');
const taxRateInput = document.getElementById('taxRate');
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const resultContainer = document.getElementById('resultContainer');
const resultBillAmount = document.getElementById('resultBillAmount');
const resultTaxAmount = document.getElementById('resultTaxAmount');
const resultTipAmount = document.getElementById('resultTipAmount');
const resultTotalAmount = document.getElementById('resultTotalAmount');
const resultAmountPerPerson = document.getElementById('resultAmountPerPerson');
const billBreakdown = document.getElementById('billBreakdown');

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Set tip percentage
function setTipPercentage(percentage) {
    tipPercentageInput.value = percentage;
}

// Calculate tip
function calculateTip() {
    // Get input values
    const billAmount = parseFloat(billAmountInput.value) || 0;
    const tipPercent = parseFloat(tipPercentageInput.value) || 0;
    const numberOfPeople = parseInt(numberOfPeopleInput.value) || 1;
    const taxRate = parseFloat(taxRateInput.value) || 0;

    // Validate inputs
    if (billAmount <= 0) {
        alert('Please enter a valid bill amount');
        return;
    }

    if (tipPercent < 0) {
        alert('Tip percentage cannot be negative');
        return;
    }

    if (numberOfPeople < 1) {
        alert('Number of people must be at least 1');
        return;
    }

    // Calculate amounts
    const taxAmount = (billAmount * taxRate) / 100;
    const tipAmount = (billAmount * tipPercent) / 100;
    const totalAmount = billAmount + taxAmount + tipAmount;
    const amountPerPerson = totalAmount / numberOfPeople;

    // Update results
    resultBillAmount.textContent = formatCurrency(billAmount);
    resultTaxAmount.textContent = formatCurrency(taxAmount);
    resultTipAmount.textContent = formatCurrency(tipAmount);
    resultTotalAmount.textContent = formatCurrency(totalAmount);
    resultAmountPerPerson.textContent = formatCurrency(amountPerPerson);

    // Update bill breakdown
    const billPercentage = (billAmount / totalAmount) * 100;
    const taxPercentage = (taxAmount / totalAmount) * 100;
    const tipPercentageVisual = (tipAmount / totalAmount) * 100;

    billBreakdown.style.width = `${billPercentage}%`;
    billBreakdown.style.backgroundColor = '#28a745';
    billBreakdown.style.backgroundImage = `linear-gradient(to right, #28a745 ${billPercentage}%, #ffc107 ${billPercentage}% ${billPercentage + taxPercentage}%, #dc3545 ${billPercentage + taxPercentage}% ${billPercentage + taxPercentage + tipPercentageVisual}%)`;

    // Show results
    resultContainer.style.display = 'block';
}

// Clear inputs
function clearInputs() {
    billAmountInput.value = '';
    tipPercentageInput.value = '';
    numberOfPeopleInput.value = '1';
    taxRateInput.value = '';
    resultContainer.style.display = 'none';
}

// Event listeners
calculateBtn.addEventListener('click', calculateTip);
clearBtn.addEventListener('click', clearInputs);

// Add keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculateTip();
    }
}); 
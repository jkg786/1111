// Get DOM elements
const homeValueInput = document.getElementById('homeValue');
const mortgageBalanceInput = document.getElementById('mortgageBalance');
const helocAmountInput = document.getElementById('helocAmount');
const interestRateInput = document.getElementById('interestRate');
const drawPeriodInput = document.getElementById('drawPeriod');
const repaymentPeriodInput = document.getElementById('repaymentPeriod');
const drawPaymentTypeSelect = document.getElementById('drawPaymentType');
const repaymentTypeSelect = document.getElementById('repaymentType');
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const resultContainer = document.getElementById('resultContainer');
const resultAvailableEquity = document.getElementById('resultAvailableEquity');
const resultDrawPayment = document.getElementById('resultDrawPayment');
const resultRepaymentPayment = document.getElementById('resultRepaymentPayment');
const resultTotalInterest = document.getElementById('resultTotalInterest');
const resultTotalCost = document.getElementById('resultTotalCost');
const paymentBreakdown = document.getElementById('paymentBreakdown');

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Calculate monthly payment for principal and interest
function calculateMonthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const numberOfPayments = years * 12;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

// Calculate interest only payment
function calculateInterestOnlyPayment(principal, annualRate) {
    return (principal * annualRate) / 12 / 100;
}

// Calculate HELOC payments
function calculateHelocPayments() {
    // Get input values
    const homeValue = parseFloat(homeValueInput.value) || 0;
    const mortgageBalance = parseFloat(mortgageBalanceInput.value) || 0;
    const helocAmount = parseFloat(helocAmountInput.value) || 0;
    const interestRate = parseFloat(interestRateInput.value) || 0;
    const drawPeriod = parseFloat(drawPeriodInput.value) || 0;
    const repaymentPeriod = parseFloat(repaymentPeriodInput.value) || 0;
    const drawPaymentType = drawPaymentTypeSelect.value;
    const repaymentType = repaymentTypeSelect.value;

    // Validate inputs
    if (homeValue <= 0) {
        alert('Please enter a valid home value');
        return;
    }

    if (mortgageBalance < 0) {
        alert('Mortgage balance cannot be negative');
        return;
    }

    if (helocAmount <= 0) {
        alert('Please enter a valid HELOC amount');
        return;
    }

    if (interestRate <= 0) {
        alert('Please enter a valid interest rate');
        return;
    }

    if (drawPeriod <= 0) {
        alert('Please enter a valid draw period');
        return;
    }

    if (repaymentPeriod <= 0) {
        alert('Please enter a valid repayment period');
        return;
    }

    // Calculate available equity
    const availableEquity = homeValue - mortgageBalance;

    // Calculate draw period payments
    let drawPayment;
    if (drawPaymentType === 'interestOnly') {
        drawPayment = calculateInterestOnlyPayment(helocAmount, interestRate);
    } else {
        drawPayment = calculateMonthlyPayment(helocAmount, interestRate, drawPeriod);
    }

    // Calculate repayment period payments
    let repaymentPayment;
    if (repaymentType === 'interestOnly') {
        repaymentPayment = calculateInterestOnlyPayment(helocAmount, interestRate);
    } else {
        repaymentPayment = calculateMonthlyPayment(helocAmount, interestRate, repaymentPeriod);
    }

    // Calculate total interest
    const drawPeriodInterest = (helocAmount * interestRate * drawPeriod) / 100;
    const repaymentPeriodInterest = (helocAmount * interestRate * repaymentPeriod) / 100;
    const totalInterest = drawPeriodInterest + repaymentPeriodInterest;

    // Calculate total cost
    const totalCost = helocAmount + totalInterest;

    // Update results
    resultAvailableEquity.textContent = formatCurrency(availableEquity);
    resultDrawPayment.textContent = formatCurrency(drawPayment);
    resultRepaymentPayment.textContent = formatCurrency(repaymentPayment);
    resultTotalInterest.textContent = formatCurrency(totalInterest);
    resultTotalCost.textContent = formatCurrency(totalCost);

    // Update payment breakdown
    const principalPercentage = (helocAmount / totalCost) * 100;
    const interestPercentage = (totalInterest / totalCost) * 100;

    paymentBreakdown.style.width = `${principalPercentage + interestPercentage}%`;
    paymentBreakdown.style.backgroundColor = '#28a745';
    paymentBreakdown.style.backgroundImage = `linear-gradient(to right, #28a745 ${principalPercentage}%, #ffc107 ${principalPercentage}% ${principalPercentage + interestPercentage}%)`;

    // Show results
    resultContainer.style.display = 'block';
}

// Clear inputs
function clearInputs() {
    homeValueInput.value = '';
    mortgageBalanceInput.value = '';
    helocAmountInput.value = '';
    interestRateInput.value = '';
    drawPeriodInput.value = '';
    repaymentPeriodInput.value = '';
    drawPaymentTypeSelect.value = 'interestOnly';
    repaymentTypeSelect.value = 'principalAndInterest';
    resultContainer.style.display = 'none';
}

// Event listeners
calculateBtn.addEventListener('click', calculateHelocPayments);
clearBtn.addEventListener('click', clearInputs);

// Add keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculateHelocPayments();
    }
}); 
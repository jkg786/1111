// Get DOM elements
const projectCostInput = document.getElementById('projectCost');
const projectDurationInput = document.getElementById('projectDuration');
const landCostInput = document.getElementById('landCost');
const constructionCostInput = document.getElementById('constructionCost');
const infrastructureCostInput = document.getElementById('infrastructureCost');
const marketingCostInput = document.getElementById('marketingCost');
const otherCostsInput = document.getElementById('otherCosts');
const expectedRevenueInput = document.getElementById('expectedRevenue');
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const resultContainer = document.getElementById('resultContainer');
const resultTotalCost = document.getElementById('resultTotalCost');
const resultCostPerSqFt = document.getElementById('resultCostPerSqFt');
const resultExpectedProfit = document.getElementById('resultExpectedProfit');
const resultProfitMargin = document.getElementById('resultProfitMargin');
const resultReraIndex = document.getElementById('resultReraIndex');
const costBreakdown = document.getElementById('costBreakdown');

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Format percentage
function formatPercentage(value) {
    return value.toFixed(2) + '%';
}

// Calculate RERA index
function calculateReraIndex() {
    // Get input values
    const projectCost = parseFloat(projectCostInput.value) || 0;
    const projectDuration = parseFloat(projectDurationInput.value) || 0;
    const landCost = parseFloat(landCostInput.value) || 0;
    const constructionCost = parseFloat(constructionCostInput.value) || 0;
    const infrastructureCost = parseFloat(infrastructureCostInput.value) || 0;
    const marketingCost = parseFloat(marketingCostInput.value) || 0;
    const otherCosts = parseFloat(otherCostsInput.value) || 0;
    const expectedRevenue = parseFloat(expectedRevenueInput.value) || 0;

    // Validate inputs
    if (projectCost <= 0) {
        alert('Please enter a valid project cost');
        return;
    }

    if (projectDuration <= 0) {
        alert('Please enter a valid project duration');
        return;
    }

    if (expectedRevenue <= 0) {
        alert('Please enter a valid expected revenue');
        return;
    }

    // Calculate total cost
    const totalCost = landCost + constructionCost + infrastructureCost + marketingCost + otherCosts;

    // Calculate cost per square foot (assuming average project size)
    const averageProjectSize = 1000; // square feet
    const costPerSqFt = totalCost / averageProjectSize;

    // Calculate expected profit
    const expectedProfit = expectedRevenue - totalCost;

    // Calculate profit margin
    const profitMargin = (expectedProfit / expectedRevenue) * 100;

    // Calculate RERA index (simplified formula)
    const reraIndex = (expectedRevenue / totalCost) * 100;

    // Update results
    resultTotalCost.textContent = formatCurrency(totalCost);
    resultCostPerSqFt.textContent = formatCurrency(costPerSqFt);
    resultExpectedProfit.textContent = formatCurrency(expectedProfit);
    resultProfitMargin.textContent = formatPercentage(profitMargin);
    resultReraIndex.textContent = reraIndex.toFixed(2);

    // Update cost breakdown
    const landPercentage = (landCost / totalCost) * 100;
    const constructionPercentage = (constructionCost / totalCost) * 100;
    const infrastructurePercentage = (infrastructureCost / totalCost) * 100;
    const marketingPercentage = (marketingCost / totalCost) * 100;
    const otherPercentage = (otherCosts / totalCost) * 100;

    costBreakdown.style.width = `${landPercentage + constructionPercentage + infrastructurePercentage + marketingPercentage + otherPercentage}%`;
    costBreakdown.style.backgroundColor = '#28a745';
    costBreakdown.style.backgroundImage = `linear-gradient(to right, 
        #28a745 ${landPercentage}%, 
        #ffc107 ${landPercentage}% ${landPercentage + constructionPercentage}%, 
        #17a2b8 ${landPercentage + constructionPercentage}% ${landPercentage + constructionPercentage + infrastructurePercentage}%, 
        #dc3545 ${landPercentage + constructionPercentage + infrastructurePercentage}% ${landPercentage + constructionPercentage + infrastructurePercentage + marketingPercentage}%, 
        #6c757d ${landPercentage + constructionPercentage + infrastructurePercentage + marketingPercentage}% ${landPercentage + constructionPercentage + infrastructurePercentage + marketingPercentage + otherPercentage}%)`;

    // Show results
    resultContainer.style.display = 'block';
}

// Clear inputs
function clearInputs() {
    projectCostInput.value = '';
    projectDurationInput.value = '';
    landCostInput.value = '';
    constructionCostInput.value = '';
    infrastructureCostInput.value = '';
    marketingCostInput.value = '';
    otherCostsInput.value = '';
    expectedRevenueInput.value = '';
    resultContainer.style.display = 'none';
}

// Event listeners
calculateBtn.addEventListener('click', calculateReraIndex);
clearBtn.addEventListener('click', clearInputs);

// Add keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculateReraIndex();
    }
}); 
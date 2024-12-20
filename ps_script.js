document.addEventListener('DOMContentLoaded', function() {
    const grossSalaryInput = document.getElementById('gross-salary-pay-sim');
    const niInput = document.getElementById('national-insurance');
    const pensionInput = document.getElementById('pension');
    const taxInput = document.getElementById('income-tax');
    const netPayInput = document.getElementById('net-pay');
    const pensionToggle = document.getElementById('pension-toggle');
    const bikToggle = document.getElementById('bik-toggle');
    const bikFields = document.querySelectorAll('.bik-fields');

    function calculateNI(monthlySalary) {
      const primaryThreshold = 1048; // Monthly Primary Threshold for 2024-2025
      const upperEarningsLimit = 4167; // Monthly Upper Earnings Limit for 2024-2025
      const lowerRate = 0.08; // Updated NI rate between primary threshold and upper earnings limit
      const higherRate = 0.02; // NI rate above upper earnings limit

      let monthlyNI = 0;

      if (monthlySalary > primaryThreshold) {
        if (monthlySalary <= upperEarningsLimit) {
          monthlyNI = (monthlySalary - primaryThreshold) * lowerRate;
        } else {
          monthlyNI = (upperEarningsLimit - primaryThreshold) * lowerRate + (monthlySalary - upperEarningsLimit) * higherRate;
        }
      }

      return monthlyNI;
    }

    function getPensionRate(grossSalary) {
      if (grossSalary <= 1466.70) {
        return 0.055; // 5.5%
      } else if (grossSalary <= 2300) {
        return 0.060; // 6%
      } else if (grossSalary <= 3741.70) {
        return 0.065; // 6.5%
      } else if (grossSalary <= 4,733.40) {
        return 0.068; // 6.8%
      } else if (grossSalary <= 6,641.70) {
        return 0.085; // 8.5%
      } else {
        return 0; // default
      }
    }

    function calculatePension(grossSalary) {
      const pensionRate = getPensionRate(grossSalary);
      return grossSalary * pensionRate;
    }

    function calculateTax(grossSalary, pension) {
      const taxableSalary = grossSalary - pension - 1048.25;
      return taxableSalary > 0 ? taxableSalary * 0.20 : 0; // 20% tax rate
    }

    function calculateNetPay(grossSalary, ni, pension, tax) {
      return grossSalary - ni - pension - tax;
    }

    function updateCalculations() {
      const grossSalary = parseFloat(grossSalaryInput.value.replace(/,/g, '')) || 0;
      const ni = calculateNI(grossSalary);
      const pension = pensionToggle.checked ? calculatePension(grossSalary) : 0;
      const tax = calculateTax(grossSalary, pension);
      const netPay = calculateNetPay(grossSalary, ni, pension, tax);

      niInput.value = ni.toFixed(2);
      pensionInput.value = pension.toFixed(2);
      taxInput.value = tax.toFixed(2);
      netPayInput.value = netPay.toFixed(2);
    }

    grossSalaryInput.addEventListener('input', updateCalculations);
    pensionToggle.addEventListener('change', updateCalculations);

    bikToggle.addEventListener('change', function() {
      if (bikToggle.checked) {
        bikFields.forEach(field => field.style.display = 'block');
      } else {
        bikFields.forEach(field => field.style.display = 'none');
      }
    });

    // Ensure BIK fields are hidden initially
    bikFields.forEach(field => field.style.display = 'none');
  });

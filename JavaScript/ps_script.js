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
      if (grossSalary*12 <= 17600) {
        return 0.055; // 5.5%
      } else if (grossSalary*12 <= 27600) {
        return 0.060; // 6%
      } else if (grossSalary*12 <= 44900) {
        return 0.065; // 6.5%
      } else if (grossSalary*12 <= 56800) {
        return 0.068; // 6.8%
      } else if (grossSalary*12 <= 79700) {
        return 0.085; // 8.5%
      } else if (grossSalary*12 <= 112900) {
        return 0.099; // 9.9%
      } else if (grossSalary*12 <= 133100) {
        return 0.105; // 10.5%
      } else if (grossSalary*12 <= 199700) {
        return 0.114; // 11.4%
      } else if (grossSalary*12 >= 199701) {
        return 0.125; // 12.5%
      } else {
        return 0; // default
      }
    }
    
    function calculatePension(grossSalary) {
      const pensionRate = getPensionRate(grossSalary);
      const pension = grossSalary * pensionRate;
      
      // Truncate to two decimal places without rounding
      return Math.floor(pension * 100) / 100;
    }
    
    

    function calculateTax(grossSalary, pension) {
      const personalAllowance = 1048.25;
      const taxableSalary = grossSalary - pension - personalAllowance;
      const tax = taxableSalary > 0 ? taxableSalary * 0.20 : 0; // 20% tax rate
      
      // Round down to the nearest 10 pence
      const roundedTax = Math.floor(tax * 10) / 10;
    
      return roundedTax;
    }
    
    function calculateTax(grossSalary, pension) {
      const personalAllowance = 1048.25;
      
      // Subtract personal allowance and truncate to nearest whole number
      const taxableSalary = Math.floor(grossSalary - pension - personalAllowance);
      
      // Calculate tax based on truncated taxable salary
      const tax = taxableSalary > 0 ? taxableSalary * 0.20 : 0; // 20% tax rate
      
      // Round down to the nearest 10 pence
      const roundedTax = Math.floor(tax * 10) / 10;
    
      return roundedTax;
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

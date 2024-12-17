document.addEventListener('DOMContentLoaded', function() {
    const grossSalaryInput = document.getElementById('gross-salary-pay-sim');
    const niInput = document.getElementById('national-insurance');
    const pensionInput = document.getElementById('pension');
    const taxInput = document.getElementById('income-tax');
    const netPayInput = document.getElementById('net-pay');
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

    function calculatePension(grossSalary) {
      return grossSalary * 0.06; // 6% pension contribution
    }

    function calculateTax(grossSalary, pension) {
      const taxableSalary = grossSalary - pension - 1048;
      return taxableSalary > 0 ? taxableSalary * 0.20 : 0; // 20% tax rate
    }

    function calculateNetPay(grossSalary, ni, pension, tax) {
      return grossSalary - ni - pension - tax;
    }

    grossSalaryInput.addEventListener('input', function() {
      const grossSalary = parseFloat(grossSalaryInput.value.replace(/,/g, '')) || 0;
      const ni = calculateNI(grossSalary);
      const pension = calculatePension(grossSalary);
      const tax = calculateTax(grossSalary, pension);
      const netPay = calculateNetPay(grossSalary, ni, pension, tax);

      niInput.value = ni.toFixed(2);
      pensionInput.value = pension.toFixed(2);
      taxInput.value = tax.toFixed(2);
      netPayInput.value = netPay.toFixed(2);
    });

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

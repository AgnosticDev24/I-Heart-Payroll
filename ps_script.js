document.addEventListener('DOMContentLoaded', function() {
    const grossSalaryInput = document.getElementById('gross-salary-pay-sim');
    const niInput = document.getElementById('national-insurance');

    function calculateNI(monthlySalary) {
      const primaryThreshold = 1048; // Monthly Primary Threshold for 2024-2025
      const upperEarningsLimit = 4167; // Monthly Upper Earnings Limit for 2024-2025
      const lowerRate = 0.12; // NI rate between primary threshold and upper earnings limit
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

    grossSalaryInput.addEventListener('input', function() {
      const monthlySalary = parseFloat(grossSalaryInput.value.replace(/,/g, '')) || 0;
      const ni = calculateNI(monthlySalary);
      niInput.value = ni.toFixed(2);
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    const annualSalaryInput = document.getElementById('annual-salary');
    const ttoToggle = document.getElementById('tto-toggle');
    const ttoAmountInput = document.getElementById('tto-amount');
    const ttoAppliedSalarySpan = document.getElementById('tto-applied-salary');
    const dailyRateSpan = document.getElementById('daily-rate');
    const daysRequestedInput = document.getElementById('days-requested');
    const totalLoanSpan = document.getElementById('total-loan');
    const repaymentPeriodInput = document.getElementById('repayment-period');
    const monthlyDeductionsSpan = document.getElementById('monthly-deductions');
    const ttoSection = document.querySelector('.tto-section');

    function formatNumber(num) {
      return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    function calculateTTOAppliedSalary() {
      const annualSalary = parseFloat(annualSalaryInput.value.replace(/,/g, '')) || 0;
      const ttoAmount = ttoToggle.checked ? (parseFloat(ttoAmountInput.value) || 52) : 52;
      const weeklySalary = annualSalary / 52;
      const ttoAppliedSalary = weeklySalary * ttoAmount;

      const formattedTTOAppliedSalary = formatNumber(ttoAppliedSalary);
      ttoAppliedSalarySpan.textContent = formattedTTOAppliedSalary;
      calculateDailyRate(ttoAppliedSalary);
    }

    function calculateDailyRate(ttoAppliedSalary) {
      const dailyRate = (ttoAppliedSalary / 365) * 7 / 5;
      dailyRateSpan.textContent = formatNumber(dailyRate);
      calculateTotalLoan(dailyRate);
    }

    function calculateTotalLoan(dailyRate) {
      const daysRequested = parseFloat(daysRequestedInput.value) || 0;
      const totalLoan = dailyRate * daysRequested;
      totalLoanSpan.textContent = formatNumber(totalLoan);
      calculateMonthlyDeductions(totalLoan);
    }

    function calculateMonthlyDeductions(totalLoan) {
      const repaymentPeriod = parseFloat(repaymentPeriodInput.value) || 1;
      const monthlyDeductions = totalLoan / repaymentPeriod;
      monthlyDeductionsSpan.textContent = formatNumber(monthlyDeductions);
    }

    function toggleTTO() {
      if (ttoToggle.checked) {
        ttoAmountInput.disabled = false;
        ttoSection.classList.remove('disabled');
      } else {
        ttoAmountInput.disabled = true;
        ttoSection.classList.add('disabled');
        ttoAmountInput.value = ''; // Clear the TTO Amount if not in use
      }
      calculateTTOAppliedSalary();
    }

    annualSalaryInput.addEventListener('input', calculateTTOAppliedSalary);
    ttoAmountInput.addEventListener('input', calculateTTOAppliedSalary);
    daysRequestedInput.addEventListener('input', function() {
      const dailyRate = parseFloat(dailyRateSpan.textContent.replace(/,/g, '')) || 0;
      calculateTotalLoan(dailyRate);
    });
    repaymentPeriodInput.addEventListener('input', function() {
      const totalLoan = parseFloat(totalLoanSpan.textContent.replace(/,/g, '')) || 0;
      calculateMonthlyDeductions(totalLoan);
    });
    ttoToggle.addEventListener('change', toggleTTO);
    toggleTTO(); // Initialize the state on page load
  });




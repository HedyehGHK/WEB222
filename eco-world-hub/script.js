// Author: Your Name

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  const scoreInput = document.getElementById('scoreInput');
  const checkBtn = document.getElementById('checkBtn');
  const resultMsg = document.getElementById('resultMsg');
  
  // Enable/Disable button based on input validity
  scoreInput.addEventListener('input', function () {
    const value = parseInt(scoreInput.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      checkBtn.disabled = false;
    } else {
      checkBtn.disabled = true;
      resultMsg.textContent = '';
    }
  });
  
  // On click of button
  checkBtn.addEventListener('click', function () {
    const value = parseInt(scoreInput.value, 10);
    let message = '';
    if (value <= 33) {
      message = 'Needs Improvement 🌍';
    } else if (value <= 66) {
      message = 'Getting There 🌱';
    } else {
      message = 'Excellent Eco Score! 🌿';
    }
    resultMsg.textContent = message;
  });
  
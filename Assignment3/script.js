// Author: Hedyeh Ghesmati Kalourazi
document.addEventListener("DOMContentLoaded", () => {
  const fahrenheitInput = document.getElementById("fahrenheit");
  const convertButton = document.getElementById("convert");
  const celsiusInput = document.getElementById("celsius");
  const historyArea = document.getElementById("history");
  const averageButton = document.getElementById("average");
  const resetButton = document.getElementById("reset");

  let values = [];

  // Function to validate allowed characters
  function isAllowedChar(char, index) {
    return (char >= "0" && char <= "9") || (char === "-" && index === 0);
  }

  // Function to validate if the input is a number and within valid range
  function isValidNumber(value) {
    const number = parseInt(value);
    return !isNaN(number) && number >= -9999 && number <= 9999;
  }

  // Handle user input in the Fahrenheit field
  fahrenheitInput.addEventListener("input", () => {
    let value = fahrenheitInput.value;
    let cleanValue = "";

    for (let i = 0; i < value.length; i++) {
      if (isAllowedChar(value[i], i)) {
        cleanValue += value[i];
      }
    }
    let maxLength = cleanValue[0] === "-" ? 5 : 4;

    if (cleanValue.length > maxLength) {
      let trimmed = "";
      for (let i = 0; i < maxLength; i++) {
        trimmed += cleanValue[i];
      }
      cleanValue = trimmed;
    }

    fahrenheitInput.value = cleanValue;

    convertButton.disabled = !isValidNumber(cleanValue);
  });

  // Allow pressing Enter to trigger the Convert button
  fahrenheitInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !convertButton.disabled) {
      convertButton.click();
    }
  });

  // Keyboard shortcuts
  document.addEventListener("keypress", (event) => {
    if (event.key.toLowerCase() === "c" && !convertButton.disabled) {
      convertButton.click();
    } else if (event.key.toLowerCase() === "a" && !averageButton.disabled) {
      averageButton.click();
    } else if (
      event.key.toLowerCase() === "r" &&
      resetButton.style.display !== "none"
    ) {
      resetButton.click();
    }
  });
  // Convert Fahrenheit to Celsius and store the result
  function handleConvert() {
    const fahrenheit = parseInt(fahrenheitInput.value, 10);
    if (isNaN(fahrenheit)) return;

    const celsius = ((fahrenheit - 32) * 5) / 9;

    celsiusInput.value = celsius.toFixed(2);

    values.push({ fahrenheit, celsius });
    historyArea.value +=
      `\t\t${fahrenheit}°F`.padEnd(25) + `${celsius.toFixed(2)}°C\n`;

    if (values.length >= 10) {
      convertButton.disabled = true;
      fahrenheitInput.disabled = true;

      convertButton.removeEventListener("click", handleConvert);

      calculateAverage();
    }

    fahrenheitInput.value = "";
    convertButton.disabled = true;
    if (values.length < 10) {
      averageButton.disabled = values.length === 0;
    }

    fahrenheitInput.focus();
  }

  convertButton.addEventListener("click", handleConvert);

  // Function to calculate and display average
  function calculateAverage() {
    if (values.length === 0) return;

    let totalF = 0;
    for (let i = 0; i < values.length; i++) {
      totalF += values[i].fahrenheit;
    }
    const avgFahrenheit = (totalF / values.length).toFixed(2);

    let totalC = 0;
    for (let i = 0; i < values.length; i++) {
      totalC += values[i].celsius;
    }
    const avgCelsius = (totalC / values.length).toFixed(2);

    const separator = "=".repeat(45);
    historyArea.value += `\n\t${separator}\n`;
    historyArea.value +=
      `\t\t${avgFahrenheit}°F`.padEnd(25) + `${avgCelsius}°C\n`;

    resetButton.style.display = "inline-block";
    averageButton.disabled = true;
  }

  // When Average button is clicked
  averageButton.addEventListener("click", calculateAverage);

  // Reset all fields and state to start fresh
  resetButton.addEventListener("click", () => {
    values = [];
    fahrenheitInput.value = "";
    celsiusInput.value = "";
    historyArea.value = "";

    convertButton.disabled = true;
    averageButton.disabled = true;
    resetButton.style.display = "none";

    fahrenheitInput.disabled = false;
    fahrenheitInput.focus();
  });
});

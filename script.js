// Selectors for form elements
const registrationForm = document.getElementById("registration");
const errorDisplay = document.getElementById("errorDisplay");

// Utility to show error
function showError(message) {
  errorDisplay.textContent = message;
  errorDisplay.style.display = "block";
}

// Utility to hide error
function hideError() {
  errorDisplay.style.display = "none";
}

// Selectors for form elements
const registrationForm = document.getElementById('registration');
const errorDisplay = document.getElementById('errorDisplay');

// Utility to show error
function showError(message) {
  errorDisplay.textContent = message;
  errorDisplay.style.display = 'block';
}

// Utility to hide error
function hideError() {
  errorDisplay.style.display = 'none';
}

// Username validation
function validateUsername(username) {
  const uniqueChars = new Set(username).size >= 2;
  const isValidFormat = /^[a-zA-Z0-9]{4,}$/.test(username);
  
  if (!username) return "The username cannot be blank.";
  if (username.length < 4) return "The username must be at least four characters long.";
  if (!uniqueChars) return "The username must contain at least two unique characters.";
  if (!isValidFormat) return "The username cannot contain special characters or whitespace.";
  
  // Check for unique username in localStorage (if storing that way)
  const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
  if (existingUsers[username.toLowerCase()]) return "That username is already taken.";

  return null; // No errors
}

// Email validation
function validateEmail(email) {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isInvalidDomain = email.toLowerCase().includes("@example.com");

  if (!isEmail) return "The email must be a valid email address.";
  if (isInvalidDomain) return "The email must not be from the domain 'example.com'.";
  
  return null;
}

// Password validation
function validatePassword(password, username) {
  const minLength = password.length >= 12;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  const noForbiddenWords = !password.toLowerCase().includes("password") && !password.includes(username);

  if (!minLength) return "Password must be at least 12 characters long.";
  if (!hasUpper) return "Password must contain at least one uppercase letter.";
  if (!hasLower) return "Password must contain at least one lowercase letter.";
  if (!hasNumber) return "Password must contain at least one number.";
  if (!hasSpecial) return "Password must contain at least one special character.";
  if (!noForbiddenWords) return "Password cannot contain the word 'password' or the username.";

  return null;
}

// Handle form submission
registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();
  hideError();

  const username = registrationForm.elements['username'].value;
  const email = registrationForm.elements['email'].value;
  const password = registrationForm.elements['password'].value;
  const passwordCheck = registrationForm.elements['passwordCheck'].value;
  const termsAccepted = registrationForm.elements['terms'].checked;

  // Validate each field
  let errorMessage = validateUsername(username);
  if (errorMessage) return showError(errorMessage);

  errorMessage = validateEmail(email);
  if (errorMessage) return showError(errorMessage);

  errorMessage = validatePassword(password, username);
  if (errorMessage) return showError(errorMessage);

  if (password !== passwordCheck) {
    return showError("Both passwords must match.");
  }

  if (!termsAccepted) {
    return showError("The terms and conditions must be accepted.");
  }

  // Save to localStorage
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  users[username.toLowerCase()] = { email: email.toLowerCase(), password };
  localStorage.setItem('users', JSON.stringify(users));

  // Success
  alert("Registration successful!");
  registrationForm.reset();
  hideError();
});

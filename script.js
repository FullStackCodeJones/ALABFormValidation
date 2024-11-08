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
// Username validation
function validateUsername(username) {
  const uniqueChars = new Set(username).size >= 2;
  const isValidFormat = /^[a-zA-Z0-9]{4,}$/.test(username);

  if (!username) return "The username cannot be blank.";
  if (username.length < 4)
    return "The username must be at least four characters long.";
  if (!uniqueChars)
    return "The username must contain at least two unique characters.";
  if (!isValidFormat)
    return "The username cannot contain special characters or whitespace.";

  // Check for unique username in localStorage (if storing that way)
  const existingUsers = JSON.parse(localStorage.getItem("users") || "{}");
  if (existingUsers[username.toLowerCase()])
    return "That username is already taken.";

  return null; // No errors
}
// Email validation
function validateEmail(email) {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isInvalidDomain = email.toLowerCase().includes("@example.com");
  
    if (!isEmail) return "The email must be a valid email address.";
    if (isInvalidDomain) return "The email must not be from the domain 'example.com'.";
    
    return null;
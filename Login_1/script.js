document.addEventListener("DOMContentLoaded", function () {
  // Navigation buttons
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const forgotBtn = document.getElementById("forgotBtn");

  // Forms
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const forgotForm = document.getElementById("forgotForm");
  const showForgot = document.getElementById("showForgot");

  // Utility function to show the selected form and update active button style
  function showForm(form) {
    // Hide all forms
    loginForm.classList.remove("active");
    signupForm.classList.remove("active");
    forgotForm.classList.remove("active");

    // Reset all nav button active states
    loginBtn.classList.remove("active");
    signupBtn.classList.remove("active");
    forgotBtn.classList.remove("active");

    // Display the selected form
    form.classList.add("active");

    // Set corresponding nav button active style
    if (form === loginForm) loginBtn.classList.add("active");
    if (form === signupForm) signupBtn.classList.add("active");
    if (form === forgotForm) forgotBtn.classList.add("active");
  }

  // Event listeners for navigation
  loginBtn.addEventListener("click", () => showForm(loginForm));
  signupBtn.addEventListener("click", () => showForm(signupForm));
  forgotBtn.addEventListener("click", () => showForm(forgotForm));

  // Link from login to forgot password
  showForgot.addEventListener("click", function (e) {
    e.preventDefault();
    showForm(forgotForm);
  });

  // Log details on form submission
  // Login form
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    console.log("Login Attempt:", { email, password });
  });

  // Signup form
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    console.log("Signup Attempt:", { username, email, password });
  });

  // Forgot password form
  forgotForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = forgotForm.querySelector('input[type="email"]').value;
    console.log("Forgot Password Attempt:", { email });
  });
});
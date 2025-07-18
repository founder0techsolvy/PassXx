// Firebase Config----presentation over

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCs-LVetCfMPCDvS2bQumkk_e_Q0gjqvYU",
  authDomain: "passx-9a4ec.firebaseapp.com",
  projectId: "passx-9a4ec",
  storageBucket: "passx-9a4ec.appspot.com",
  messagingSenderId: "221509781528",
  appId: "1:221509781528:web:b03782a94971aa20dcdb6d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const container = document.querySelector(".container");
const signupBtn = document.getElementById("signup-btn");
const signinBtn = document.getElementById("signin-btn");
const signupFormBtn = document.querySelector(".signup-form button");
const signinFormBtn = document.querySelector(".signin-form button");
const resetPasswordBtn = document.getElementById("resetPassword");
const emailSignup = document.querySelector(".signup-form input[type='email']");
const passwordSignup = document.querySelector(".signup-form input[type='password']");
const confirmPasswordSignup = document.getElementById("confirm-password"); // Added confirm password field
const emailSignin = document.querySelector(".signin-form input[type='email']");
const passwordSignin = document.querySelector(".signin-form input[type='password']");

// Add transition for form switching
signupBtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signinBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Loader Functions
function showLoader(button, loadingText) {
  button.dataset.originalText = button.innerHTML;
  button.innerHTML = loadingText;
  button.disabled = true;
}

function hideLoader(button) {
  button.innerHTML = button.dataset.originalText;
  button.disabled = false;
}

// Form Validation Functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

// Reset form fields
function resetFormFields(...fields) {
  fields.forEach(field => {
    if (field) field.value = "";
  });
}

// Signup Functionality
signupFormBtn.addEventListener("click", () => {
  const email = emailSignup.value;
  const password = passwordSignup.value;
  const confirmPassword = confirmPasswordSignup.value; // Get confirm password value

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePassword(password)) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  // Confirm Password Check
  if (password !== confirmPassword) {
    alert("Passwords does not matched.");
    return;
  }

  showLoader(signupFormBtn, "Creating your account...");

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("User signed up successfully:", userCredential.user);
      window.location.href = "../pages/hero.html";
    })
    .catch(error => {
      console.error("Signup error:", error.message);
      alert("Signup failed: " + error.message);
      resetFormFields(emailSignup, passwordSignup, confirmPasswordSignup);
    })
    .finally(() => hideLoader(signupFormBtn));
});

// Signin Functionality
signinFormBtn.addEventListener("click", () => {
  const email = emailSignin.value;
  const password = passwordSignin.value;

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePassword(password)) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  showLoader(signinFormBtn, "Logging in...");

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("User signed in successfully:", userCredential.user);
      window.location.href = "../pages/hero.html";
    })
    .catch(error => {
      console.error("Signin error:", error.message);
      alert("Signin failed: " + error.message);
      resetFormFields(emailSignin, passwordSignin);
    })
    .finally(() => hideLoader(signinFormBtn));
});

// Password Reset Functionality
resetPasswordBtn.addEventListener("click", () => {
  const email = prompt("Enter your registered email to reset your password:");

  if (email) {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset link sent! Please check your email inbox.");
      })
      .catch(error => {
        console.error("Password reset error:", error.message);
        alert("Error: " + error.message);
      });
  }
});

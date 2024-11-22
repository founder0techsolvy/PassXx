// Firebase Config (no change)
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

// Transition Changes (Mobile and Desktop)
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


// Show loader
function showLoader(button, loadingText) {
button.dataset.originalText = button.innerHTML;
button.innerHTML = loadingText;
button.disabled = true;
}
    // Show spinner and disable button


// Hide loader
function hideLoader(button) {
    button.innerHTML = button.dataset.originalText;
    button.disabled = false;
}

// Form validation
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

// Email-Based Sign-Up
const signUp = document.getElementById("signup");
signUp.addEventListener("click", function () {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!validateEmail(email.value)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePassword(password.value)) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    showLoader(signUp, "Creating your account...");

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredentials) => {
            console.log("User created successfully");
            window.location.href = "../pages/hero.html";
        })
        .catch((error) => {
            console.error("Error signing up:", error.message);
            alert("Error signing up! Please try again..: " + error.message);
            resetFormFields(email, password); // Reset form fields
        })
        .finally(() => {
            hideLoader(signUp);
        });
});

// Email-Based Sign-In
const signInNormal = document.getElementById("sign-in-normal");
signInNormal.addEventListener("click", function () {
    const email = document.getElementById("emailLogIn");
    const password = document.getElementById("passwordLogIn");

    if (!validateEmail(email.value)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePassword(password.value)) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    showLoader(signInNormal, "Logging you in...");

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            console.log("Logged in successfully");
            window.location.href = "../pages/hero.html";
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
            alert("Error logging in! Please try again..: " + error.message);
            resetFormFields(email, password); // Reset form fields
        })
        .finally(() => {
            hideLoader(signInNormal);
        });
});

// Password Reset
const resetPassword = document.getElementById("resetPassword");
resetPassword.addEventListener("click", function () {
    const email = prompt("Enter your registered email to reset your password:");
    if (email) {
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset link sent successfully!");
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error.message);
                alert("Error: " + error.message);
            });
    }
});

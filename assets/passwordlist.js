import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCs-LVetCfMPCDvS2bQumkk_e_Q0gjqvYU",
    authDomain: "passx-9a4ec.firebaseapp.com",
    databaseURL: "https://passx-9a4ec-default-rtdb.firebaseio.com",
    projectId: "passx-9a4ec",
    storageBucket: "passx-9a4ec.appspot.com",
    messagingSenderId: "221509781528",
    appId: "1:221509781528:web:b03782a94971aa20dcdb6d",
    measurementId: "G-G4FP3XT3HS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const passwordList = document.getElementById("password-list");
const addNewPassword = document.getElementById("addnewpass");
const navHome = document.getElementById("home");
const logoutButton = document.getElementById("logout");

// Event: DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadPasswords(user.uid);
        } else {
            alert("You are not logged in. Redirecting to login page.");
            window.location.href = "../pages/login.html";
        }
    });
});

// Load Passwords
function loadPasswords(userId) {
    const dbRef = ref(getDatabase());
    passwordList.innerHTML = "<p>Loading passwords...</p>"; // Show loading message

    get(child(dbRef, `users/${userId}/credentials`))
        .then((snapshot) => {
            passwordList.innerHTML = ""; // Clear loading message
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    displayPassword(data);
                });
            } else {
                passwordList.innerHTML = "<p>No passwords saved yet. Add your first password!</p>";
            }
        })
        .catch((error) => {
            console.error("Error getting data:", error);
            passwordList.innerHTML = "<p>Error loading data. Please try again later.</p>";
        });
}

// Display Password Entry
function displayPassword(data) {
    const passwordEntry = document.createElement("div");
    passwordEntry.className = "password-entry";
    passwordEntry.innerHTML = `
        <h2>${data.websitename}</h2>
        <p>Email/User-Id: ${data.userIdentifier}</p>
        <div class="password">
            <p><b>Password:</b></p>
            <input type="password" value="${data.primaryPassword}" disabled>
            <span class="toggle-visibility" title="Show/Hide Password">👁️</span>
            <span class="copy" title="Copy Password">📋</span>
        </div>
        ${data.secondaryPassword ? `
        <div class="password">
            <p><b>Password:</b></p>
            <input type="password" value="${data.secondaryPassword}" disabled>
            <span class="toggle-visibility" title="Show/Hide Password">👁️</span>
            <span class="copy" title="Copy Password">📋</span>
        </div>` : ''}
    `;
    passwordList.appendChild(passwordEntry);

    addPasswordEventListeners(passwordEntry);
}

function addPasswordEventListeners(passwordEntry) {
    const inputs = passwordEntry.querySelectorAll("input");
    const toggleVisibilityButtons = passwordEntry.querySelectorAll(".toggle-visibility");
    const copyButtons = passwordEntry.querySelectorAll(".copy");

    // Toggle visibility for both primary and secondary passwords
    toggleVisibilityButtons.forEach((toggleVisibility, index) => {
        toggleVisibility.addEventListener("click", () => {
            const input = inputs[index];
            if (input.type === "password") {
                input.type = "text";
                toggleVisibility.textContent = "🙈";
            } else {
                input.type = "password";
                toggleVisibility.textContent = "👁️";
            }
        });
    });

    // Copy functionality for both passwords
    copyButtons.forEach((copyButton, index) => {
        copyButton.addEventListener("click", () => {
            const input = inputs[index];
            navigator.clipboard
                .writeText(input.value)
                .then(() => showNotification("Password copied to clipboard!"))
                .catch((error) => {
                    console.error("Failed to copy password:", error);
                    showNotification("Failed to copy password. Please try again.");
                });
        });
    });
}


// Show Notification
function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000); // Auto-dismiss after 3 seconds
}

// Navigation: Add New Password
addNewPassword.addEventListener("click", () => {
    window.location.href = "../pages/addpassword.html";
});

// Navigation: Home
navHome.addEventListener("click", () => {
    window.location.href = "../pages/hero.html";
});

// Logout
logoutButton.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("User logged out");
            alert("You have been logged out.");
            window.location.href = "../pages/login.html";
        })
        .catch((error) => {
            console.error("Logout failed:", error);
            showNotification("Logout failed. Please try again.");
        });
});


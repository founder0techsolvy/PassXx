import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const navHome = document.getElementById("home");
navHome.addEventListener("click", () => {
    window.location.href = "../pages/hero.html";
});

const firebaseConfig = {
    apiKey: "AIzaSyCs-LVetCfMPCDvS2bQumkk_e_Q0gjqvYU",
    authDomain: "passx-9a4ec.firebaseapp.com",
    projectId: "passx-9a4ec",
    storageBucket: "passx-9a4ec.appspot.com",
    messagingSenderId: "221509781528",
    appId: "1:221509781528:web:b03782a94971aa20dcdb6d",
    measurementId: "G-G4FP3XT3HS",
    databaseURL: "https://passx-9a4ec-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = "en";
const database = getDatabase(app);

console.log("Script connected");

const addingPassword = document.getElementById("adding-password");

addingPassword.addEventListener("click", function () {
    const websitename = document.getElementById("websiteToAdd").value.trim();
    const userIdentifier = document.getElementById("emailToAdd").value.trim(); // This can be email, mobile number, or user ID
    const password = document.getElementById("passwordToAdd").value.trim();

    // Form validation
    if (!websitename || !userIdentifier || !password) {
        alert("All fields are required. Please fill in all fields.");
        return;
    }

    if (!validateUserIdentifier(userIdentifier)) {
        alert(
            "Please enter a valid email, mobile number, or user ID. Mobile numbers should be 10 digits."
        );
        return;
    }

    // Show spinner and disable button
    addingPassword.disabled = true;
    addingPassword.innerHTML = '<span class="spinner"></span> Adding Password...';

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("User ID:", uid);

            const sanitizedWebsiteName = websitename.replace(
                /[^a-zA-Z0-9_-]/g,
                "_"
            );

            function writeUserData(userId, websitename, userIdentifier, password) {
                console.log("Saving data to database...");

                const websiteRef = ref(
                    database,
                    `users/${userId}/credentials/${sanitizedWebsiteName}`
                );

                set(websiteRef, {
                    websitename: websitename,
                    userIdentifier: userIdentifier,
                    password: password,
                })
                    .then(() => {
                        console.log("Data saved successfully!");

                        // Show success message
                        document.getElementById("add-pass-success").style.transition =
                            "all 0.5s ease-in-out";
                        document.getElementById("add-pass-success").style.display =
                            "flex";

                        // Redirect after 2 seconds
                        setTimeout(() => {
                            document.getElementById("add-pass-success").style.display =
                                "none";
                            window.location.href = "../pages/passwordlist.html";
                        }, 2000);
                    })
                    .catch((error) => {
                        console.error("Error saving data:", error);
                        addingPassword.disabled = false; // Re-enable button on failure
                        addingPassword.textContent = "Add Password";
                    });
            }

            writeUserData(uid, sanitizedWebsiteName, userIdentifier, password);
        } else {
            console.log("User is logged out");
        }
    });

    console.log("Entered in adding password event");
});

// Validation function for email, mobile number, or user ID
function validateUserIdentifier(identifier) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Matches email addresses
    const mobileRegex = /^\d{10}$/; // Matches 10-digit mobile numbers
    const userIdRegex = /^[a-zA-Z0-9_-]{3,}$/; // Matches user IDs (min 3 characters, alphanumeric, underscore, or hyphen)

    return emailRegex.test(identifier) || mobileRegex.test(identifier) || userIdRegex.test(identifier);
}

function showError(message) {
    const errorBox = document.getElementById("error-box");
    errorBox.textContent = message;
    errorBox.style.display = "block";
}

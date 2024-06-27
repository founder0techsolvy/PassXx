import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAyMYsKMwOWeiWl_a2o0Q9ybHcoHcmBcAw",
    authDomain: "passx-b9457.firebaseapp.com",
    projectId: "passx-b9457",
    storageBucket: "passx-b9457.appspot.com",
    messagingSenderId: "1078047940805",
    appId: "1:1078047940805:web:b3a8c1e83317013b4150ac",
    measurementId: "G-BF41YRMRB0",
    databaseURL: "https://passx-b9457-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadPasswords(user.uid);
        }
    });
});

function loadPasswords(userId) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/credentials`)).then((snapshot) => {
        if (snapshot.exists()) {
            const passwordList = document.getElementById("password-list");
            passwordList.innerHTML = ""; // Clear existing entries
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                const passwordEntry = document.createElement("div");
                passwordEntry.className = "password-entry";
                passwordEntry.innerHTML = `
                    <h2>${data.websitename}</h2>
                    <p>Email: ${data.email}</p>
                    <div class="password">
                        <input type="password" value="${data.password}" disabled>
                        <span class="toggle-visibility">👁️</span>
                        <span class="copy">📋</span>
                    </div>
                `;
                passwordList.appendChild(passwordEntry);

                const passwordInput = passwordEntry.querySelector("input");
                const toggleVisibility = passwordEntry.querySelector(".toggle-visibility");
                const copyButton = passwordEntry.querySelector(".copy");

                toggleVisibility.addEventListener("click", () => {
                    if (passwordInput.type === "password") {
                        passwordInput.type = "text";
                        toggleVisibility.textContent = "🙈";
                    } else {
                        passwordInput.type = "password";
                        toggleVisibility.textContent = "👁️";
                    }
                });

                copyButton.addEventListener("click", () => {
                    navigator.clipboard.writeText(passwordInput.value).then(() => {
                        alert("Password copied to clipboard!");
                    }).catch((error) => {
                        console.error("Failed to copy password:", error);
                    });
                });
            });
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error("Error getting data:", error);
    });
}

const addNewPassword = document.getElementById("addnewpass");
addNewPassword.addEventListener("click", function(){
    window.location.href = "../pages/addpassword.html"
})

const navHome = document.getElementById("home");
navHome.addEventListener("click", () => {
    window.location.href = "../pages/hero.html"
})
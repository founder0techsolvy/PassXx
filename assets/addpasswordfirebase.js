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



// encrypting the password to save in the database



function encryptPassword(password, secretKey) {

    return CryptoJS.AES.encrypt(password, secretKey).toString();

}



// Decryption function

function decryptPassword(encryptedPassword, secretKey) {

    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);

    return bytes.toString(CryptoJS.enc.Utf8);

}





const secretKey = "$#@&-+_()/$#@#_-+)-$)/&#";















addingPassword.addEventListener("click", function () {

    const websitename = document.getElementById("websiteToAdd").value.trim();

    const userIdentifier = document.getElementById("emailToAdd").value.trim(); // This can be email, mobile number, or user ID

    const primaryPassword = document.getElementById("primaryPasswordToAdd").value.trim();

    const secondaryPassword= document.getElementById("secondaryPasswordToAdd").value.trim();

    const encryptedPrimaryPassword = encryptPassword(primaryPassword, secretKey);

    const encryptedSecondaryPassword = encryptPassword(secondaryPassword, secretKey);



    console.log(encryptedPrimaryPassword, encryptedSecondaryPassword);

    



    // Form validation

    if (!websitename || !userIdentifier || !encryptedPrimaryPassword) {

        alert("Website/App Name, Email/User-Id, and Primary Password are required.");

        return;

    }



    if (!validateUserIdentifier(userIdentifier)) {

        alert("Please enter a valid email, mobile number, or user ID. Mobile numbers should be 10 digits.");

        return;

    }



    // Show spinner and disable button

    addingPassword.disabled = true;

    addingPassword.innerHTML = '<span class="spinner"></span> Adding Password...';



    onAuthStateChanged(auth, (user) => {

        if (user) {

            const uid = user.uid;

            console.log("User ID:", uid);



            const sanitizedWebsiteName = websitename.replace(/[^a-zA-Z0-9_-]/g, "_");



            function writeUserData(userId, websitename, userIdentifier, encryptedPrimaryPassword, encryptedSecondaryPassword) {

                console.log("Saving data to database...");



                const websiteRef = ref(

                    database,

                    `users/${userId}/credentials/${sanitizedWebsiteName}`

                );



                set(websiteRef, {

                    websitename: websitename,

                    userIdentifier: userIdentifier,

                    primaryPassword: encryptedPrimaryPassword,

                    secondaryPassword: encryptedSecondaryPassword || null, // Save null if secondary password is not provided

                })

                    .then((data) => {

                        console.log("Data saved successfully!");

                        console.log(data);

                        



                        // Show success message

                        document.getElementById("add-pass-success").style.transition = "all 0.5s ease-in-out";

                        document.getElementById("add-pass-success").style.display = "flex";



                        // Redirect after 2 seconds

                        setTimeout(() => {

                            document.getElementById("add-pass-success").style.display = "none";

                            window.location.href = "../pages/passwordlist.html";

                        }, 2000);

                    })

                    .catch((error) => {

                        console.error("Error saving data:", error);

                        addingPassword.disabled = false; // Re-enable button on failure

                        addingPassword.textContent = "Add Password";

                    });

            }



            writeUserData(uid, sanitizedWebsiteName, userIdentifier, encryptedPrimaryPassword, encryptedSecondaryPassword);

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



//



// Toggle visibility for Primary Password

const togglePrimaryPassword = document.getElementById("togglePrimaryPassword");

const primaryPasswordInput = document.getElementById("primaryPasswordToAdd");



togglePrimaryPassword.addEventListener("click", () => {

    if (primaryPasswordInput.type === "password") {

        primaryPasswordInput.type = "text";

        togglePrimaryPassword.textContent = "🙈"; // Change icon

    } else {

        primaryPasswordInput.type = "password";

        togglePrimaryPassword.textContent = "👁️"; // Revert icon

    }

});



// Toggle visibility for Secondary Password

const toggleSecondaryPassword = document.getElementById("toggleSecondaryPassword");

const secondaryPasswordInput = document.getElementById("secondaryPasswordToAdd");



toggleSecondaryPassword.addEventListener("click", () => {

    if (secondaryPasswordInput.type === "password") {

        secondaryPasswordInput.type = "text";

        toggleSecondaryPassword.textContent = "🙈"; // Change icon

    } else {

        secondaryPasswordInput.type = "password";

        toggleSecondaryPassword.textContent = "👁️"; // Revert icon

    }

});

                                

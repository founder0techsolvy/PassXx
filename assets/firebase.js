import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCs-LVetCfMPCDvS2bQumkk_e_Q0gjqvYU",
    authDomain: "passx-9a4ec.firebaseapp.com",
    projectId: "passx-9a4ec",
    storageBucket: "passx-9a4ec.appspot.com",
    messagingSenderId: "221509781528",
    appId: "1:221509781528:web:b03782a94971aa20dcdb6d",
    measurementId: "G-G4FP3XT3HS",
    databaseURL: "https://passx-9a4ec-default-rtdb.firebaseio.com/"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

// Google LogIn

    const googleLogin = document.getElementById("sign-up-google");
    console.log("working 2");
    googleLogin.addEventListener("click", function () {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("User signed in: ", user);
                localStorage.setItem("displayName", user.displayName);
                window.location.href = "../pages/hero.html";
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error("Error signing in: ", error);
            });
    });

// Set up our register function

const signUp = document.getElementById("signup");
console.log("working 3");
signUp.addEventListener("click", function () {
    console.log("in signup event");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullname = document.getElementById("full_name").value;

    // Move on with Auth
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log(user);
            console.log("user created successfully");
            window.location.href = "../pages/hero.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

//   Signing In the user

const signInNormal = document.getElementById("sign-in-normal");

signInNormal.addEventListener("click", function () {
    console.log("in signIn event");
    const email = document.getElementById("emailLogIn").value;
    const password = document.getElementById("passwordLogIn").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log("logged in");
            window.location.href = "../pages/hero.html";
            console.log("page changed");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

// const addingPassword = document.getElementById("add-more-password");



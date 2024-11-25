// Toggle between login and signup forms
//const loginForm = document.getElementById("loginForm");
//const signupForm = document.getElementById("signupForm");
//const toggleButtons = document.querySelectorAll("#toggleButton");

//toggleButtons.forEach((button) => {
  //  button.addEventListener("click", () => {
    //    if (loginForm.style.display === "none") {
      //      loginForm.style.display = "block";
        //    signupForm.style.display = "none";
       // } else {
         //   loginForm.style.display = "none";
           // signupForm.style.display = "block";
       // }
   // });
//});

//New js 
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const signInButton = document.querySelector('#signIn');
    const signUpButton = document.querySelector('#signUp');

    signInButton.addEventListener('click', () => {
        container.classList.add('show-sign-in');
        container.classList.remove('show-sign-up');
    });

    signUpButton.addEventListener('click', () => {
        container.classList.add('show-sign-up');
        container.classList.remove('show-sign-in');
    });
});

//reset password 
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
      

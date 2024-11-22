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

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAT69QDg-VR9ff3-7n8EtoMt79rxN6vilQ",
  authDomain: "vistaara-holidays.firebaseapp.com",
  projectId: "vistaara-holidays",
  storageBucket: "vistaara-holidays.firebasestorage.app",
  messagingSenderId: "913960710388",
  appId: "1:913960710388:web:803284a94f8bcdb0f42ea1",
  measurementId: "G-RRE3TY842X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Make this function global so your HTML button can call it
window.loginWithGoogle = function () {
  console.log("Google login triggered"); // debug
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert("Welcome " + user.displayName);
      console.log("User info:", user);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Email passwordless login (magic link)
const actionCodeSettings = {
  url: window.location.href, // redirect to same page
  handleCodeInApp: true
};

window.sendMagicLink = function(email) {
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      alert("Magic link sent! Check your email to log in.");
    })
    .catch(console.error);
};

// Complete sign-in after opening the email link
window.handleMagicLink = function() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) email = window.prompt('Please provide your email for confirmation');
    signInWithEmailLink(auth, email, window.location.href)
      .then(result => {
        alert("Welcome " + result.user.email);
        window.localStorage.removeItem('emailForSignIn');
        const modal = document.getElementById("loginModal");
        if(modal) modal.style.display = "none";
      })
      .catch(console.error);
  }
};


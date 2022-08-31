import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCtb18q2LD0Dzn5wCKsC1gLW4wKFDNwUw4",
  authDomain: "auth-cc2d9.firebaseapp.com",
  projectId: "auth-cc2d9",
  storageBucket: "auth-cc2d9.appspot.com",
  messagingSenderId: "457753235229",
  appId: "1:457753235229:web:42b774ed1e349628d4dbf4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const SignInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      window.location.href = "/home";
    })
    .catch((error) => {
      console.log(error);
    });
};

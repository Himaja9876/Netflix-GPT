import React, { useRef, useState } from "react";
import { ClickValidate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { AVATARLOGO, BG_URL } from "../utils/constants";

const Login = () => {
  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  const handleClick = () => {
    setSignIn(!signIn);
  };

  const handleClickForm = (e) => {
    e.preventDefault();
    const emailUser = email.current?.value || "";
    const passwordUser = password.current?.value || "";
    const fullnameUser = signIn ? fullname.current?.value || "" : "";

    //console.log(email.current.value, password.current.value);
    const errormessage = ClickValidate(emailUser, passwordUser, fullnameUser);
    setError(errormessage);
    if (errormessage) return;

    //Code for Sign Up - It will register a User on firebase
    if (signIn) {
      createUserWithEmailAndPassword(auth, emailUser, passwordUser) //call this API and register a user
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //console.log(user)
          updateProfile(user, {
            displayName: fullnameUser,
            photoURL: AVATARLOGO,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setError(errorCode + " " + errorMessage);
        });
    } else {
      // Code for Sign In
      signInWithEmailAndPassword(auth, emailUser, passwordUser)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setError(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="w-screen h-screen" src={BG_URL} alt="Netflix Screen" />
      </div>

      <form
        onSubmit={handleClickForm}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-85"
      >
        <h1 className="font-bold text-3xl py-4">
          {signIn ? "Sign Up" : "Sign In"}
        </h1>
        {signIn && (
          <input
            ref={fullname}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <button type="submit" className="p-4 my-6 bg-red-700 w-full rounded-lg">
          {signIn ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-red-600 font-bold">{error}</p>

        <p className="cursor-pointer" onClick={handleClick}>
          {!signIn
            ? "New to Netflix? Sign up now"
            : "Already registered? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

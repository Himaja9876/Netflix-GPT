import React, { useRef, useState } from 'react'
import { ClickValidate } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Login = () => {

  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  const handleClick = () => {
    setSignIn(!signIn);
    }

  const handleClickForm = (e) => {
    e.preventDefault();
    const emailUser = email.current?.value || '';
    const passwordUser = password.current?.value || '';
    const fullnameUser = signIn ? (fullname.current?.value || '') : '';

    //console.log(email.current.value, password.current.value);
    const errormessage = ClickValidate(emailUser, passwordUser, fullnameUser);
    setError(errormessage);
    if(errormessage) return;

    //Code for Sign Up - It will register a User on firebase
    if(signIn) {
      createUserWithEmailAndPassword(auth, emailUser, passwordUser ) //call this API and register a user
      .then((userCredential) => {
       // Signed up 
       const user = userCredential.user;
       //console.log(user)
        updateProfile(user, {
          displayName: fullnameUser, photoURL: "https://media.licdn.com/dms/image/v2/D5635AQEYJL78z6asWg/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1693461881556?e=1724875200&v=beta&t=8-zpmLCUraCRBwZePMpgTzn4Hq9ucB8U8fS1aPSDAoQ"
        }).then(() => {
          // Profile updated!
          // console.log(user);
          navigate("/");
        }).catch((error) => {
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
       console.log(user);
       navigate("/browse");
  
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

    setError(errorCode + " " + errorMessage);
  });

    }
    
  }

  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Netflix Screen" />
      </div>
     
      <form onSubmit={handleClickForm}  className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-85">

        <h1 className="font-bold text-3xl py-4">
        {signIn ? "Sign Up" : "Sign In"}
       
        </h1>
        { signIn && 
        <input 
        ref={fullname}
        type='text' 
        placeholder='Full Name' 
        className="p-4 my-4 w-full bg-gray-700" 
        />}

        <input
        ref={email}
        type='text' 
        placeholder='Email or mobile number' 
        className="p-4 my-4 w-full bg-gray-700" 
        />

        <input 
        ref={password}
        type='password' 
        placeholder='Password' 
        className="p-4 my-4 w-full bg-gray-700" 
        />

        <button 
        type='submit' 
        className="p-4 my-6 bg-red-700 w-full rounded-lg">
        {signIn ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-red-600 font-bold">{error}</p>

        
        <p 
        className="cursor-pointer" 
        onClick={handleClick}>{!signIn ? "New to Netflix? Sign up now" : "Already registered? Sign in now"}
        </p>

      </form>
    </div>
  )
}

export default Login
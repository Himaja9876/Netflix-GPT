import React, { useRef, useState } from 'react'
import { ClickValidate } from '../utils/validate';

const Login = () => {

  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState("");

  const email = useRef("");
  const password = useRef("");
  const fullname = useRef("");

  const handleClick = () => {
    setSignIn(!signIn);
    }

  const handleClickForm = (e) => {
    e.preventDefault();
    //console.log(email.current.value, password.current.value);
    const errormessage = ClickValidate(email.current.value, password.current.value, fullname.current.value);
    setError(errormessage);
  }

  return (
    <div>
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
        type='text' 
        placeholder='Password' 
        className="p-4 my-4 w-full bg-gray-700" 
        />

        <button 
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
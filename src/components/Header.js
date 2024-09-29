import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import {onAuthStateChanged} from "firebase/auth";
import { addUser} from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from '../utils/constants';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);
  console.log(user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        navigate("/error");
      });
  };


  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ 
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
         }));
         navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe;
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  return (
      <div className='absolute z-20 w-screen px-8 py-2 bg-gradient-to-b from-black flex flex-col md:flex-row justify-between'>
      
        <img
          className="w-44 mx-auto md:mx-0"
          src = {LOGO}
          alt="Netflix Logo"
        />
          {user && (
            <div className="flex p-2 justify-between">
            
            <select
              className="p-2 m-2 bg-gray-900 text-white"  
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
           <img
            className="hidden md:block w-12 h-12"
            src={user.photoURL}
            alt="usericon"
          />
          <button onClick={handleSignOut} className="font-bold text-white">
            Sign Out
          </button>
        </div> 
          )}
      </div>
    )
};

export default Header;

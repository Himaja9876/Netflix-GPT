import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
    return (
        <>
          <div className='absolute -z-10'>
            <img src={BG_URL} alt="Netflix Screen" />
            </div>
          <div className="">
            <GptSearchBar />
            <GptMovieSuggestions />
          </div>          
        </>
      );
}

export default GptSearch
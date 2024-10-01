import React from 'react';
import { useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import { useRef } from "react";
import openai from '../utils/openai';


const GptSearchBar = () => {

  const langKey = useSelector(store => store.lang.lang)
  console.log(langKey);
  const searchText = useRef(null);
  //console.log(lang[langKey]);

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    // Make an API call to GPT API and get Movie Results

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: 'Say this is a test' }],
      model: "gpt-3.5-turbo",
    });

    console.log(gptResults);
    
    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }

  
  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 w-100 h-24 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input 
        ref={searchText}
        type='text' 
        className='p-4 m-4 col-span-9' 
        placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className='col-span-3 m-4 py-2 px-4 bg-red-700 rounded-lg text-white' onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>

      </form>

    </div>
  )
}

export default GptSearchBar
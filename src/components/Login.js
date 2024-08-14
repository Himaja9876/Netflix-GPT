import React from 'react'

const Login = () => {
  return (
    <div>
      <div>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Netflix Screen" />
      </div>
      <form className=' bg-black'>
        <input type='text' placeholder='Email or mobile number' className='p-2 m-2' />
        <input type='text' placeholder='Email or mobile number' className='p-2 m-2' />
        <button className='p-2 m-2'>Sign In</button>
      </form>
    </div>
  )
}

export default Login
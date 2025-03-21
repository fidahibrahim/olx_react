import olx from '../assets/olx.png'
import lens from '../assets/lens.png'
import arrow from '../assets/arrow.png'
import search from '../assets/search.png'
import Login from './Login'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/setup'
import { onAuthStateChanged, signOut } from 'firebase/auth'

type searchProp = {
  setSearch: any
}

const Navbar = (props: searchProp) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false); 
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () =>{
    try {
      await signOut(auth)
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
    <div className='flex p-4 bg-slate-100 shadow-md'>
      <img src={olx} className='w-11 h-9' />
      <div className='flex border-2 border-spacing-1 w-64 p-2 border-black ml-5 bg-white'>
        <img src={lens} className='w-6 h-5 mt-1' />
        <input placeholder='Location' className='ml-3 outline-none' />
        <img src={arrow} className='w-8 h-7' />
      </div>
      <div className='flex h-12 ml-4 border-2 border-black bg-white'>
        <input onChange={(e)=> props.setSearch(e.target.value)}  placeholder='Find Cars, Mobile phones and more' className='ml-3 w-96 outline-none' />
        <img src={search} />
      </div>
      <div className='flex h-12 p-3 ml-10 cursor-pointer'>
        <h1 className='font-semibold'>ENGLISH</h1>
        <img src={arrow} className='w-8 h-7' />
      </div>
      <div onClick={isLoggedIn ? handleLogout : ()=> setLoginPopup(!loginPopup)} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
        <h1 className='font-bold text-lg'>{isLoggedIn ? 'Logout' : 'Login'}</h1>
      </div>
      <div className=' w-28 flex h-12 p-2 ml-6 cursor-pointer rounded-full border border-yellow-500'>
        <h1 className='font-bold text-lg ml-3'>+ SELL</h1>
      </div>
    </div>
    {loginPopup && <Login setLoginPopup = {setLoginPopup} setIsLoggedIn={setIsLoggedIn}/>}
    </>
  )
}

export default Navbar

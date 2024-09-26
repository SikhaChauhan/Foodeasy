import React, { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { SlArrowDown } from "react-icons/sl";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); 
  const { currentUser } = useSelector((state) => state.user) || {}; 

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/users/sign-out', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in'); 
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const isActive = (path) => {
    return location.pathname === path || (path === '/dashboard?tab=profile' && location.search.includes('tab=profile'));
  };

  return (
    <nav className='relative text-black bg-white border-b-8 border-b-pink-500 z-60'>
      <div className='flex items-center justify-between p-4 ml-2'>
        <div className='flex items-center'>
          <button
            className='mr-2 font-bold text-black lg:hidden md:hidden'
            // onClick={() => setIsSidebarOpen(true)}
          >
            {/* <HiOutlineMenu className='w-8 h-8' /> */}
          </button>
          
          <Link to='/'>
            <img
              src='/assets/Logo.png'
              className='h-10 ml-2 bg-white rounded w-30 md:h-16 md:w-38 sm:h-10'
              alt='Logo'
            />
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className='relative lg:hidden md:left-12'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='font-bold'
            style={{ fontSize: isMenuOpen ? '1.3rem' : '1.7rem ' }}
          >
            {isMenuOpen ? '✖' : <SlArrowDown />}
          </button>
          {isMenuOpen && (
            <div className="absolute z-50 w-48 text-black transform -translate-x-1/2 bg-white border-b-8 border-l-4 border-r-4 rounded-md border-r-pink-500 border-b-pink-500 border-l-pink-500 mt-9 left-1/2">
              <div className="flex flex-col items-center py-2">
                <Link to='/' className={`py-2 px-4 ${isActive('/') ? 'text-pink-800' : 'hover:text-black'}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to='/about' className={`py-2 px-4 ${isActive('/about') ? 'text-pink-800' : 'hover:text-black'}`} onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link to='/allPost' className={`py-2 px-4 ${isActive('/allPost') ? 'text-pink-800' : 'hover:text-black'}`} onClick={() => setIsMenuOpen(false)}>All Posts</Link>
                <Link to='/contact' className={`py-2 px-4 ${isActive('/contact') ? 'text-pink-800' : 'hover:text-black'}`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
                {currentUser?.isAdmin ? (
                  <Link to='/dashboard?tab=profile' className={`py-2 px-4 ${isActive('/dashboard?tab=profile') ? 'text-pink-800' : 'hover:text-black'}`} onClick={() => setIsMenuOpen(false)}>Profile</Link>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className='hidden gap-20 lg:flex'>
          <Link to='/' className={`font-bold transition-colors duration-300 ${isActive('/') ? 'text-pink-800' : 'text-black hover:text-black'}`}>Home</Link>
          <Link to='/about' className={`font-bold transition-colors duration-300 ${isActive('/about') ? 'text-pink-800' : 'text-black hover:text-black'}`}>About</Link>
          <Link to='/allPost' className={`font-bold transition-colors duration-300 ${isActive('/allPost') ? 'text-pink-800' : 'text-black hover:text-black'}`}>All Posts</Link>
          <Link to='/contact' className={`font-bold transition-colors duration-300 ${isActive('/contact') ? 'text-pink-800' : 'text-black hover:text-black'}`}>Contact</Link>
          {currentUser?.isAdmin ? (
            <Link to='/dashboard?tab=profile' className={`font-bold transition-colors duration-300 ${isActive('/dashboard?tab=profile') ? 'text-pink-800' : 'text-black hover:text-black'}`}>
              Profile
            </Link>
          ) : null}
        </div>

        {/* User Dropdown */}
        <div className='mr-3'>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <img
                  src={currentUser?.profilePicture}
                  alt='user'
                  className='w-16 h-16 border-2 border-white rounded-full'
                  referrerPolicy="no-referrer"
                />
              }
              className='relative z-30'
            >
              <Dropdown.Item>
                @{currentUser?.username}<br />{currentUser?.email}
              </Dropdown.Item>
              <Link to='/favorites'>
                <Dropdown.Item>My Fav</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to='/sign-in'>
              <span className='px-2 py-1 mt-2 font-bold text-black'>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}






import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const { setShowSearch, showSearch, getCartCount, navigate, setToken, token, setCartItems, fetchUserProfile, user } = useContext(ShopContext);


  const logOut = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  }

  const handleSearchClick = () => {
    setShowSearch(prev => !prev);

    if(!showSearch){
      navigate('/collection');
    }
  }

  useEffect(() => {
    fetchUserProfile();
  },[token]);


  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      <Link to={'/'}>
        <img src={assets.logo2} className='w-36' alt="logo" />
      </Link>
      

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>

        <img onClick={handleSearchClick} src={assets.search_icon} alt="search-icon" className='w-5 cursor-pointer'/>
        
        <div className='group relative'>

          <div className='flex items-center object-cover w-full h-full'>
            <img onClick={() => token ? setDropDownVisible(prev => !prev) : navigate('/login')} src={token ? user?.profileImg?.url : assets.profile_icon} alt="profile-icon" className={`${token ? 'w-7 h-7 rounded-full object-cover' : 'w-5'} cursor-pointer`}/>
          </div>
          {/* Dropdown Menu */}
          {token && dropDownVisible ?
            <div className='absolute dropdown-menu right-0 pt-4 z-3'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
                <p onClick={() => {navigate('/profile'); setDropDownVisible(false)}} className='cursor-pointer hover:text-black'>My profile</p>
                <p onClick={() => {navigate('/orders'); setDropDownVisible(false)}} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={() => {logOut(); setDropDownVisible(false)}} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
            :
            null
          }
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart-icon" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>
            {getCartCount()}
          </p>
        </Link>
        <img src={assets.menu_icon} className='w-6 cursor-pointer sm:hidden' alt="menu-icon" onClick={()=> setVisible(true)}/>
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-5 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={()=> setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer border-b-2 border-gray-400'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="dropdown-icon" />
            <p>
              Back
            </p>
          </div>
          <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border-b-2 border-x-2 border-gray-400' to='/'>HOME</NavLink>
          <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border-b-2 border-x-2 border-gray-400' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border-b-2 border-x-2 border-gray-400' to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border-b-2 border-x-2 border-gray-400' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
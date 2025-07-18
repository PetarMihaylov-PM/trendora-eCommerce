import { useContext, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangePassword = () => {

  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const { navigate, backendUrl } = useContext(ShopContext);

  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(newPassword !== confirmPassword){
      setMessage("Password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(backendUrl + '/api/user/profile/change-password', { newPassword }, {headers: {token}});

      setMessage(response.data.message);
      
    } catch (error) {
      console.log(error);
      setMessage('Something went wrong.');
    }
  }

  return (

    <div className='border-t'>
      <div className='flex flex-col items-center max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-md xl:max-w-lg sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl/15 rounded-lg text-gray-900 border-1 border-gray-300'>
          <div className="w-full p-6 bg-white rounded-lg ">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {<Title text1={'Change'} text2={'Password'}/>}
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                    <input type="password" name="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " required/>
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " required/>
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50" required/>
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                    </div>
                </div>
                <button type="submit" className="w-full bg-black text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer hover:bg-gray-800 transition-all ease-in-out">Reset password</button>
                {message && <p className="text-center text-sm mt-2 text-red-600">{message}</p>}
            </form>
          </div>
      </div>
    </div>
  )
}

export default ChangePassword
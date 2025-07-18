import React, { useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function PlaceOrder() {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, setCartItems, cartItems, getCartAmount, deliveryFee, products } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email:'',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    
    setFormData(prev => ({...prev,[name]:value}));
  }


  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}});

          if(data.success){
            navigate('/orders');
            setCartItems({});
          }
          
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try {
      
      let orderItems = [];

      for(const items in cartItems) {
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            
            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee
      }

      switch(method) {

        // API Calls for COD
        case 'cod': 
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers: {token}});

          if (response.data.success){
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers: {token}});
          
          if(responseStripe.data.success){
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case 'razorpay':

          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}});

          if(responseRazorpay.data.success){
            initPay(responseRazorpay.data.order);
          }
          break;
        

        default:
          break
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name'/>
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address'/>
        <input onChange={onChangeHandler} name='street' value={formData.street} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={formData.city} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
          <input onChange={onChangeHandler} name='state' value={formData.state} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
          <input onChange={onChangeHandler} name='country' value={formData.country} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone'/>
      </div>


      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>

          {/* Payment method selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center border border-gray-300 gap-3 p-2 px-3 rounded cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="stripe-logo" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center border border-gray-300 gap-3 p-2 px-3 rounded  cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="razorpay-logo" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 rounded  cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>


      </div>

    </form>
  )
}

export default PlaceOrder;
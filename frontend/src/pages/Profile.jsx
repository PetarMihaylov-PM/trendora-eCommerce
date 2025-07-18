import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/frontend_assets/assets.js';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title.jsx';

function Profile() {
  
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [matchedOrders, setMatchedOrders] = useState(false);
  
  const { navigate, backendUrl, token, currency, fetchUserProfile, user } = useContext(ShopContext);

  const handleImageUpdate = async (imageFile) => {
    
    if (!imageFile) return toast.error('Please select an image');

    try {
      setLoading(true)
      const token = localStorage.getItem('token');

      const formData = new FormData();

      formData.append('image', imageFile);
      formData.append('userId', user._id);

      const response = await axios.post(backendUrl + '/api/user/profile/update-image',
        formData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if(response.data.success){
        toast.success('Profile image updated!');
        fetchUserProfile();
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadOrderData = async() => {
    try {
      
      if(!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}});
      
      if(response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const filterOrderData = (orderStatus) => {
    const filtered = [];

    if(orderStatus !== 'COD'){
      setMatchedOrders(true);
      orderData.forEach(order => {
        if(order.status === orderStatus){
          filtered.push(order);
        }
      });
    } else {
      setMatchedOrders(true);
      orderData.forEach(order => {
        if(order.paymentMethod !== 'COD'){
          filtered.push(order);
        }
      })
    }
    
    setFilteredOrders(filtered);
  }


  useEffect(() => {
    fetchUserProfile();
    loadOrderData();
  }, [token]);


  return (
    <div>

      <div className='text-center text-2xl pt-12 border-t'>
        <Title text1={'MY'} text2={"PROFILE"}/>
      </div>

      { !user ? 
         <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        :
          <div className="flex flex-col items-center max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-md xl:max-w-lg sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-8 bg-white shadow-xl/15 rounded-lg text-gray-900">

            {/* Background img */}
            <div className="flex relative rounded-t-lg w-full h-40 overflow-hidden z-1">
                <img className="absolute object-cover object-top w-full top-[-30px]" src={assets.clothing_bg} alt='clothing' />
            </div>


            {/* Profile img */}
            <div className="flex relative mx-auto w-33 h-32 -mt-16 border-2 border-white rounded-full z-2">
                {!loading ? 
                <div className='flex items-center object-cover w-full h-full'>
                  <img className="w-full h-full object-cover object-center rounded-full" src={user?.profileImg?.url || assets.user_icon} alt='user-img'/>
                  <div className='bg-gray-300/50 absolute bottom-0 right-3 w-7 p-1 rounded-full'>
                    <img src={assets.add_img_icon} alt="add-img-icon" />
                  </div>
                </div>
                :  
                <div className="w-full h-full flex items-center justify-center bg-white/70 rounded-full">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
                </div>
                }
                <input type="file" className='absolute w-full h-full rounded-full cursor-pointer opacity-0' 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if(file) {
                        handleImageUpdate(file);
                      }
                    }
                } />
            </div>


            {/* Profile name and email */}
            <div className="text-center mt-2">
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
            </div>


            {/* Buttons for orders checking */}
            <ul className="py-4 mt-2 text-gray-700 grid grid-cols-2 place-items-center gap-y-8 w-[80%]">
                <li onClick={() => filterOrderData('Delivered')} className="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
                    <img className="w-6 fill-current text-blue-900" src={assets.delivered_icon} />
                    <div>Delivered</div>
                </li>

                <li onClick={() => filterOrderData('Shipped')} className="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
                    <img className="w-6 fill-current text-blue-900" src={assets.shipped_icon} />
                    <div>Shipped</div>
                </li>

                <li onClick={() => filterOrderData('Order Placed')} className="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
                    <img className="w-6 fill-current text-blue-900" src={assets.process_icon} />
                    <div>Placed</div>
                </li>

                <li onClick={() => filterOrderData('COD')} className="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
                    <img className="w-6 fill-current text-blue-900" src={assets.payment_icon} />
                    <div>Paid</div>
                </li>
            </ul>

            {/* Change password option */}
            <div className="p-4 border-t mx-8 mt-4 w-[80%]">
                <button className="w-[60%] mt-2 py-2 px-6 block text-sm mx-auto rounded-full border bg-gray-900 hover:bg-white hover:text-black hover:border font-semibold text-white transition-all ease-in-out cursor-pointer"
                  onClick={() => navigate('/changepassword')}
                >Change Password</button>
            </div>

            {/* Display Orders */}
            <div className="w-[80%] mt-2">
              {filteredOrders.length === 0 
                ? 
                  (matchedOrders 
                    ? 
                      <p className='text-center mb-5 text-gray-700'>There are no orders with the selected status.</p>
                    : 
                    null) 
                : 
                  (filteredOrders.map((order, index) => (
                    <div key={index} className='py-4 border-t text-gray-700 flex flex-col sm:flex-col sm:items-center sm:justify-between gap-4'>
                      <div className='flex items-start gap-6 text-sm'>
                        <img className='w-16 sm:w-20' src={order.image[0]} alt="product-img" />
                        <div>
                          <p className='sm:text-base font-medium'>
                            {order.name}
                          </p>
                          <div className='flex items-center gap-3 mt-2 text-base text-gray-700'> 
                            <p>{currency}{order.price}</p>
                            <p>Quantity: {order.quantity}</p>
                            <p>Size: {order.size}</p>
                          </div>
                          <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(order.date).toDateString()}</span></p>
                          <p className='mt-1'>Payment: <span className='text-gray-400'>{order.paymentMethod}</span></p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                          <p className='w-2 h-2 rounded-full bg-green-500'></p>
                          <p className='text-sm md:text-base'>{order.status}</p>
                        </div>
                    </div>
                  )))
                }
            </div>
        </div>
      }  
    </div>
  )
}

export default Profile
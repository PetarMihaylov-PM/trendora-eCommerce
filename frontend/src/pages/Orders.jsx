import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

function Orders() {

  const { currency, backendUrl, token } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

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

  useEffect(() => {
    loadOrderData();
  },[token])

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4 border-t text-gray-700'>

              {/* Image + details section */}
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20 shrink-0' src={item.image[0]} alt="product-img" />
                <div>
                  <p className='sm:text-base font-medium'>
                    {item.name}
                  </p>
                  <div className='flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700'> 
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>

              {/* Status and button section */}
              <div className='md:w-1/2 flex justify-between items-center sm:justify-between sm:gap-4'>
                <div className='flex items-center gap-2'>
                  <p className='w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='w-30 h-10 border text-sm font-medium rounded-sm cursor-pointer'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  const handleProceedToPayment = () => {
    if(cartData.length < 1) {
      toast.error('Your cart is empty');
    } else {
      navigate('/placeorder');
    }
  }

  useEffect(() => {

    if(products.length > 0){
      const tempData = [];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }

  },[cartItems, products]);

  return (
    <div className='border-t pt-14'>
      
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      <div className='flex flex-col lg:flex-row items-center justify-between gap-10'>
      
        <div className='flex-1 w-full'>
          { cartData.length > 0 ?
            cartData.map((item, index) => {
              
              const productData = products.find(product => product._id === item._id);

              return (
                <div key={index} className='py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 max-w-[900px]'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={productData.image[0]} alt="product-img" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2 text-nowrap'>
                        <p>{currency} {productData.price}</p>
                        <p className='w-11 text-center px-2 sm:px-3 sm:py-1 border border-gray-400 bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity}/>
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer hover:scale-115 transition-all ease-in-out' src={assets.bin_icon} alt="bin_icon" />
                </div>
              )
            })
            :
            <div className='flex flex-col flex-1 items-center justify-between text-center lg:flex-row pr-8'>
              <h1 className='flex prata-regular text-gray-600 text-3xl sm:py-3 lg:text-4xl leading-relaxed text-nowrap mb-3'>
                Is Empty
              </h1>
              <img className='w-60' src={assets.empty_cart_img} alt="empty-cart" />
            </div>
    
          }
          
        </div>
        
        <div className='flex justify-end my-20'>
          <div className='w-full md:w-[450px]'>
            <CartTotal />
            <div className='w-full text-end'>
              <button onClick={handleProceedToPayment} className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer hover:bg-gray-800 transition-all ease-in-out duration-150'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
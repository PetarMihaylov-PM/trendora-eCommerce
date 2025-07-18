import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import ModalImage from 'react-modal-image';


function Product() {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const scrollToTheTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
  

  const fetchProductData = async () => {
    products.find(item => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return;
      }
    });
  }

  useEffect(() => {
    fetchProductData()
  },[productId, productData]);

  return productData ? (
    <div className= 'border-t pt-5 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>


        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
               
                <img onClick={()=> setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer transition-all ease-in hover:scale-110' alt="img" />
                
              ))
            }
          </div>
          <div id='mainImg' className='w-full sm:w-[80%]'>
            <ModalImage 
              small={image} 
              large={image}
              hideZoom={true} 
              src={image} 
              className='w-full h-auto' alt='Product image' />
          </div>
        </div>
      
        { /* Product Info */ }
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} 
                className={`w-14 text-sm border py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? ' border-orange-500' : '' }`} 
                key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-9 py-3 text-sm cursor-pointer active:opacity-80 hover:bg-gray-800'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      
      {/* Description & Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Stay cozy and stylish in this classic oversized hoodie, crafted from ultra-soft cotton-blend fleece. Featuring a relaxed fit, ribbed cuffs, and a spacious front pocket, it's perfect for layering or lounging. Available in neutral tones for effortless pairing with any outfit.</p>
          <p>"I absolutely love this hoodie! It's so soft and comfortable — perfect for chilly mornings or casual outings. The oversized fit gives it a trendy look, and the quality is top-notch. I've washed it several times and it still looks brand new. Definitely getting another color!"</p>
        </div>
      </div>

      {/* Related products */}
      
      <RelatedProducts onClick={() => scrollToTheTop()} category={productData.category} subCategory={productData.subCategory}/>
      
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
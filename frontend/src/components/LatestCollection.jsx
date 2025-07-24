import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {

  const { products, fisherYatesShuffle } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(()=> {
    const shuffleProducts = fisherYatesShuffle(products)
    setLatestProducts(shuffleProducts.slice(0, 10));
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'NEW'} text2={'ARRIVALS'}/>
        <p className='w-3/4 m-auto text-xs sm:text md:text-base text-gray-600'>
          Explore our latest collection - stylish, versatile, and made to elevate your everyday look.
        </p>
      </div>
      
      {/* Rendering the products or loading */}

      {
        latestProducts.length > 0 
          ? 
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
              {
                latestProducts.map((item, index)=> (
                  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
              }
            </div> 
          : 
            <div className="w-full h-full flex items-center justify-center bg-white/70 rounded-full">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
            </div>
      }
    </div>
  )
}

export default LatestCollection

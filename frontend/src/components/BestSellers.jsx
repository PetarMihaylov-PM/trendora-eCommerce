import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

function BestSellers() {

  const { products, fisherYatesShuffle } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(()=> {
    const bestProduct = products.filter((item) => item.bestseller);
    const shuffledBestsellers = fisherYatesShuffle(bestProduct);
    setBestSeller(shuffledBestsellers.slice(0, 5));
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={"SELLERS"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Shop our most-loved products - customer favorites that combine quality, style, and value.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item, index) => (
          <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
        ))}
      </div>

    </div>
  )
}

export default BestSellers
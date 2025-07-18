import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

  const { currency, getCartAmount, deliveryFee } = useContext(ShopContext)

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'}/>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}</p>
        </div>
        <hr />

        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {deliveryFee.toFixed(2)}</p>
        </div>
        <hr />

        <div className='flex justify-between gap-2 mt-2 text-sm'>
          <p>Total</p>
          <b>{currency} {getCartAmount() === 0 ? 0 : (getCartAmount() + deliveryFee).toFixed(2)}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
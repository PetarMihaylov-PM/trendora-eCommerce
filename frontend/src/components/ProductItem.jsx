import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price, onClick}) => {

  const {currency} = useContext(ShopContext);

  return (
    
    <Link 
      className='flex flex-col justify-between text-gray-700 cursor-pointer' 
      to={`/product/${id}`}
      onClick={onClick}
    >
      <div className='overflow-hidden'>
        <img className='h-80 w-60 object-cover overflow-hidden hover:scale-110 transition ease-in-out' src={image[0]} alt='img_icon' />
      </div>
      <p className='pt-3 pb-1 text-sm'>
        {name}
      </p>
      <p className='text-sm font-medium'>
        {currency}{price}
      </p>
    </Link>
  )
}

export default ProductItem
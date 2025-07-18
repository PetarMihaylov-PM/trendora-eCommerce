import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subcategory, setSubcategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
 

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subcategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {headers: {token}});

      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  const addOrRemoveSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]);
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img className='w-20 cursor-pointer' src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="upload-icon" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label>

          <label htmlFor='image2'>
            <img className='w-20 cursor-pointer' src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="upload-icon" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label>

          <label htmlFor='image3'>
            <img className='w-20 cursor-pointer' src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="upload-icon" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label>

          <label htmlFor='image4'>
            <img className='w-20 cursor-pointer' src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="upload-icon" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w- full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2 text-nowrap'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setSubcategory(e.target.value)} value={subcategory} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => addOrRemoveSize('S')}>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('S') ? 'bg-orange-200' : 'bg-slate-200'}`}>S</p>
          </div>

          <div onClick={() => addOrRemoveSize('M')}>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('M') ? 'bg-orange-200' : 'bg-slate-200'}`}>M</p>
          </div>

          <div onClick={() => addOrRemoveSize('L')}>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('L') ? 'bg-orange-200' : 'bg-slate-200'}`}>L</p>
          </div>

          <div onClick={() => addOrRemoveSize('XL')}>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('XL') ? 'bg-orange-200' : 'bg-slate-200'}`}>XL</p>
          </div>

          <div onClick={() => addOrRemoveSize('XXL')}>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('XXL') ? 'bg-orange-200' : 'bg-slate-200'}`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller'/>
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button className='w-28 py-2 mt-4 bg-orange-300 text-black cursor-pointer rounded-sm' type='submit'>ADD</button>
    </form>
  )
}

export default Add
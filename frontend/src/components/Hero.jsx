import { useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'

function Hero() {

  const [imageIndex, setImageIndex] = useState(0);

  const heroImages = [
    assets.hero_img2,
    assets.hero_img4,
    assets.hero_img5,
    assets.hero_img6
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  },[imageIndex]);

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>

      {/* Hero left side */}
      <section className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <div className='w-8 md:w-11 h-[2px] bg-[#414141]' aria-hidden="true"></div>
            <p className='font-medium text-sm md:text-base'>
              MOST WANTED
            </p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
            Just Dropped
          </h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>EXPLORE NOW</p>
            <div className='w-8 md:w-11 h-[2px] bg-[#414141] ' aria-hidden="true"></div>
          </div>
        </div>
      </section>

      {/* Hero right side */}
      <div className='relative w-full sm:w-1/2 aspect-[4/3] sm:min-h-[400px] overflow-hidden'>
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt='hero-img'
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === imageIndex ? 'opacity-100' : 'opacity-0 z-0'
            }`}
          />
        ))}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
          {heroImages.map((_,index) => (
            <button 
              key={index}
              onClick={() => setImageIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === imageIndex ? 'bg-black scale-125' : 'bg-gray-300'}`}
            />
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Hero
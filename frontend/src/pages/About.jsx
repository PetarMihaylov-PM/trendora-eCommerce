import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] md:max-h-[600px]' src={assets.about_img} alt="about-img" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to Trendora — your one-stop destination for timeless style and everyday essentials. We believe in combining quality with affordability, offering a carefully curated selection of fashion, accessories, and lifestyle products to suit every taste and occasion.</p>
          <p>We’re more than just a store — we’re a community built around style, trust, and convenience.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To make shopping easy, enjoyable, and inspiring. Whether you're looking for the latest trends or classic favorites, we're here to help you express your individuality through products that are made to last.</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'Why'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-gray-400 md:w-[33%] px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At Trendora, quality is at the heart of everything we do. Every product we offer is carefully selected and rigorously inspected to meet our high standards.</p>
        </div>

        <div className='border border-gray-400 md:w-[33%] px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Shopping at Trendora is designed to be simple, fast, and stress-free. With an intuitive website, secure payment options, and quick delivery, we make it easy for you to find what you need — anytime, anywhere.</p>
        </div>

        <div className='border border-gray-400 md:w-[33%] px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Customer Service:</b>
          <p className='text-gray-600'>At Trendora, we’re committed to providing exceptional customer service every step of the way.</p>
        </div>
      </div>

      <NewsLetterBox/>
      
    </div>
  )
}

export default About
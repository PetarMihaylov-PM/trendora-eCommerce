import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function Footer() {
  return (
    <div className="px-4">
      {/* Main footer section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-14 my-10 mt-20 sm:mt-40 text-sm max-w-screen-xl mx-auto">
        
        {/* Logo & text */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <img src={assets.logo2} className="mb-5 w-32" alt="logo-icon" />
          <p className="text-gray-600">
            Timeless Style. <br /> Everyday Value. <br /> Crafted to Inspire
          </p>
        </div>

        {/* Company links */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+ 1-123-456-7890</li>
            <li>contact.trendora@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-500">
          Designed with love for modern shoppers. <br />
          © 2025 TRENDORA. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer

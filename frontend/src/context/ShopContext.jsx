import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

  const currency = '$';
  const deliveryFee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {

    if(!size){
      toast.error('Please select product size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if(cartData[itemId]) {

        if (cartData[itemId][size]){
          cartData[itemId][size] += 1;
        }

        else{
          cartData[itemId][size] = 1;
        }
    }

    else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    toast.success('Product Added');

    if(token) {
      try {
        
        await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers:{token}});

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }


  function getCartCount() {
    let totalCount = 0;

    for (const product in cartItems){
      let productSizes = cartItems[product];

      for (const size in productSizes){
        let quantity = productSizes[size];
        if(typeof quantity === 'number' && quantity > 0){
          totalCount += quantity;
        }
      }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if(token) {
      try {

        await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}});
        toast.success('Cart updated');

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }

  const getCartAmount = () => {
    let totalAmount = 0;

    for(const items in cartItems){
      let itemInfo = products.find(product => product._id === items);
      for(const item in cartItems[items]){
        if (cartItems[items][item] > 0 && itemInfo) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }  
      }
    }
    return totalAmount;
  }


  const getProductData = async() => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list');
      if(response.data.success){
        setProducts(response.data.products);
      }
      else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const getUserCart = async(token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}});

      if(response.data.success){
        setCartItems(response.data.cartData);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  const fetchUserProfile = async () => {

      const token = localStorage.getItem('token');

      if(!token) {
        return;
      }

      try {
        const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          console.log(response.data.message)
          toast.error(response.data.message);
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  };


  const fisherYatesShuffle = (array) => {
      const shuffled = [...array];
  
      for (let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

  useEffect(() => {
    getProductData();

    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'));
    }

  },[]);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);


  const value = {
    products, 
    currency, 
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch ,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    fetchUserProfile,
    user,
    setUser,
    fisherYatesShuffle
  }

  return(
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
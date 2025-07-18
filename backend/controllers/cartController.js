import userModel from "../models/userModule.js";

/* Add products to user cart */
const addToCart = async (req, res) => {
  try {
    
    const {userId, itemId, size} = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if(cartData[itemId]) {
      if(cartData[itemId][size]){
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, {cartData});

    res.json({success: true, message: 'Added To Cart'});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}


/* Update user cart */
const updateCart = async (req, res) => {

  try {
    
    const {userId, itemId, size, quantity} = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await {...userData.cartData};

    if(quantity === 0) {
      // Removing the size from the item
      if(cartData[itemId] && cartData[itemId][size]){
        delete cartData[itemId][size];

        // If the item has no sizes left, removing the item
        if(Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      // Updating or creating the quantity
      if(!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, {cartData});
    res.json({success: true, message: 'Cart Updated'});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}


/* Get user cart data */
const getUserCart = async (req, res) => {

  try {
    
    const { userId } = req.body;

    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;

    res.json({success: true, cartData});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}


export {addToCart, updateCart, getUserCart};
import validator from 'validator';
import bcrypt, { genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModule.js';
import { v2 as cloudinary } from 'cloudinary';


const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET);
}


// Route for user login
const loginUser = async (req,res) => {

   try {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});

    if(!user) {
      return res.json({success: false, message: "User doesn't exists"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){

      const token = createToken(user._id);
      res.json({success:true, token});
    }

    else{
      res.json({success: false, message: "Invalid credentials"});
    }

  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message});
  }


}



// Route for user registration
const registerUser = async (req,res) => {

  try {

    const {name, email, password} = req.body;

    // checking if the user already exists
    const exists = await userModel.findOne({email});

    if(exists){
      return res.json({success: false, message: "User already exists"});
    }

    // validating the email and strong password
    if(!validator.isEmail(email)) {
      return res.json({success: false, message: "Please enter a valid email"});
    }

    if(password.length < 8) {
      return res.json({success: false, message: "Please enter a strong password"});
    }

    // hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({success: true, token});

  } catch(error) {

    console.log(error);
    res.json({success:false, message:error.message})

  }

}



// Route for admin login
const adminLogin = async(req, res) => {

  try {
    
    const { email, password } = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      res.json({success: true, token});
    } else {
      res.json({success: false, message: 'Invalid credentials'})
    }

  } catch (error) {
    
    console.log(error);
    res.json({success: false, message: error.message})

  }
}

 // Route for profile
  const getUserProfile = async (req, res) => {
    try {
      
      const { userId } = req.body;
      const user = await userModel.findById(userId).select('-password');

      if(!user){
        return res.json({success: false, message: 'User not found'});
      }
      res.json({success: true, user});

    } catch (error) {
      res.json({success: false, message: error.message});
    }
  }


  // Route for updating the profile img
  const updateProfileImage = async (req, res) => {
    try {
      
      const { userId } = req.body;

      const image = req.files?.image?.[0];

      if(!image) {
        return res.json({success: false, message: 'No image provided'});
      }

      const user = await userModel.findById(userId);

      if(!user) {
        return res.json({ success: false, message: 'User not found' });
      }

      if(user.profileImg?.public_id) {
        await cloudinary.uploader.destroy(user.profileImg.public_id);
      }

      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: 'image',
        folder: 'user_profiles',
      });


      user.profileImg = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      await user.save();

      res.json({ success: true, user });

    } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message});
    }
  }


  // Route for user password change
  const changeUserPassword = async(req, res) => {
    try {
      
      const { userId, newPassword } = req.body;

      if(!newPassword || newPassword < 8){
        res.json({success: false, message: 'Password must be at least 8 characters long.'});
      }

      const user = await userModel.findById(userId);

      if(!user) {
        res.json({success: false, message: 'User not found.'});
      }

      const salt = await genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      await user.save();

      res.json({success: true, message: 'Password updated successfully'});

    } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message});
    }
  }

export { registerUser, loginUser, adminLogin, getUserProfile, updateProfileImage, changeUserPassword }
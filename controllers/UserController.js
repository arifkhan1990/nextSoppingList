import User from '../models/User';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
   const {name, email, password} = req.body;
   const role = req.body?.role? role : 'user';

  if (!name || !email || !password) {
    return res.status(400).json({error: { msg: 'Please enter all fields' }});
  }

  try {
    const user = await User.find({email: email});

    if (user.length!=0) throw Error('User already exists');
    
    const salt = await bcrypt.genSaltSync(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = bcrypt.hashSync(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = {
      name,
      email,
      password: hash,
      role,
    };

    const savedUser = await User.create(newUser);
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600
    });

    const {...userInfo} = savedUser;
    res.status(200).json({
      token,
      user: userInfo
    });
  } catch (e) {
    res.status(400).json({error: {msg: e.message}});
  }
};


export const userLogin = async (req, res) => {

    const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({error: { msg: 'Please enter all fields' }});
  }

  try {

    const user = await User.findOne({email: email});
    if (!user) throw Error('User does not exist');
    
    
    const isMatch =  bcrypt.compareSync(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      token,
      status: 'success',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roll: user.roll
      }
    });
  } catch (e) {
    res.status(400).json({error: {error: e, msg: e.message }});
  }
}

export const readUsersInfo = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const readUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.query.userId);

    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(422).json({
        success: false,
        error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const updateUserInfo = async (req, res) => {
  const {userId} = req.query;
  const newUser = {name: req.body.name, email: req.body.email};

  if(userId && newUser){
    try {
      const newData = await User.findByIdAndUpdate({_id: userId} , newUser);
      res.status(200).json({
        success: true,
        user: newData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  }else{
    res.status(404).json({
      success: false,
      msg: "User not found",
    });
  }
};

export const deleteUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.query.itemId);

    if (!user) {
      return res.status(404).json({
        success: false,
      });
    }

    await User.deleteOne({ _id: req.query.userId });

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
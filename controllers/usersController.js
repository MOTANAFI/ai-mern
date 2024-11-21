const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//*---- Registeration ---
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //* validate user
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("please all fields are required");
  }
  //* check if email exist
  const userFound = await User.findOne({ email });

  if (userFound) {
    res.status(400);
    throw new Error("User already exist");
  }
  //* hash password

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  //* Add the date the trail will end
  newUser.trialExpires = new Date(
    new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
  );
  //Save the user
  await newUser.save();
  res.json({
    status: true,
    message: "Registeration was successfull",
    user: {
      username,
      email,
    },
  });
});
//*------ Login -----

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //*check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  //* check if password is valid
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  //*Generate token (jwt)
  const token = jwt.sign(
    {
      id: user?._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d", // Token expires in 3 days
    }
  );
 

  //* set token into cookie (http only)
  res.cookie('token', token, 
  {
    httpOnly:true,
    secure:process.evn.NOD_ENV === "production",
    sameSite: 'strict',
    maxAge: 24 *60 * 60 * 1000, // day
  })

  //* send the response

  res.json({
    status: "success",
    _id: user?._id,
    message: "Login success",
    username: user?.username,
    email: user?.email,
  });
});
//*------ Logout -----
//*------ Check user Auth Status -----

module.exports = {
  register,
  login,
};

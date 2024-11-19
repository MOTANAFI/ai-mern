const User = require("../models/User");
const bcrypt = require("bcrypt");
//*---- Registeration ---
const register = async (req, res) => {
  try {
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password);

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
    res.json({
      status: true,
      message: "Registeration was successfull",
      user: {
        username,
        email,
      },
    });
  } catch (error) {
    throw new Error(error)
  }
};
//*------ Login -----
//*------ Logout -----
//*------ Check user Auth Status -----

module.exports = {
  register,
};

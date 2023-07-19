const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const createToken = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET_KEY, {
    expiresIn: "4h",
  });
};

class UserController {
  async registration(req, res) {
    try {
      const { name, email, password } = req.body;
      console.log(name, email, password)
      let user = await userModel.findOne({ email });

      if (user) {
        return res.status(400).json("User with that email already exist...");
      }
      if (!name || !email || !password) {
        return res.status(400).json("Complete all inputs...");
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json("Write valid email...");
      }
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json("Write strong password...");
      }

      user = new userModel({ name, email, password });
      user.password = await bcrypt.hash(password, 7);
      await user.save();
      const token = createToken(user._id, email, name);

      res.status(200).json({ token });
    } catch (e) {
      console.log(e.message);
      res.status(500).json("Check error in console");
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      let user = await userModel.findOne({ email });
      if (!user) return res.status(400).json("Wrong email or password...");

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword)
        return res.status(400).json("Wrong email or password...");

      const token = createToken(user._id, email, user.name);
      res.status(200).json({ token });
    } catch (e) {
      console.log(e.message);
      res.status(500).json("Check error in console");
    }
  }

  async findUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await userModel.findById(userId);

      res.status(200).json(user);
    } catch (e) {
      console.log(e.message);
      res.status(500).json("Check error in console");
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userModel.find();

      res.status(200).json(users);
    } catch (e) {
      console.log(e.message);
      res.status(500).json("Check error in console");
    }
  }
}

module.exports = new UserController();

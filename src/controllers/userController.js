const connection = require("../config/database");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
  const { name, email, password, gender, birthday } = req.body;
  const role = "customer";
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const [existingUser] = await connection.query(
      "SELECT * FROM AppUser WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    let [rows, fields] = await connection.query(
      "INSERT INTO AppUser (name, email, password, gender, birthday, role) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, gender, birthday, role]
    );
    console.log(rows);
    res
      .status(201)
      .json({ message: "User registered successfully", data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find user in database
    const [user] = await connection.query(
      "SELECT * FROM AppUser WHERE email = ?",
      [email]
    );
    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const foundUser = user[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: foundUser.user_id,
      email: foundUser.email,
      role: foundUser.role
    };
    // Generate JWT
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    res.status(200).json({
        message: "Login successful",
        accessToken: token,
        user: {
            id: foundUser.user_id,
            email: foundUser.email,
            role: foundUser.role
        }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};


const getUser = async (req, res) => {
  const user = req.user;
  console.log(user);
  try {
    
    res.status(200).json({ message: "User retrieved successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}
module.exports = {
  handleLogin,
  handleRegister,
  getUser
};




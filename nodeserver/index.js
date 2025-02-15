const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

mongoose.connect("mongodb://127.0.0.1:27017/coachcloset");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  instruction: String,
})

const UserModel = mongoose.model("users", UserSchema)

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ $or: [{ email: email }] });
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User with this email already exist.",
      });
    }

    UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    })
      .then((user) => {
        res
          .status(200)
          .json({ success: true, message: "User created successfully.", user });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: false, message: "Error creating user." });
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("Inside login");

    const { email, password } = req.body;
    console.log("Received Login Request: ", { email });

    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log("No user found with email:", email);
      return res
        .status(200)
        .json({ success: false, message: "No user found.", type: "user" });
    }

    console.log("User found:", user.email);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Password incorrect for user:", email);
      return res.status(200).json({
        success: false,
        message: "Incorrect password.",
        type: "password",
      });
    }

    console.log("Password matched for user:", email);

    // Generate JWT token (Consider adding an expiry time for security)
    const jwtToken = jwt.sign({ userId: user._id }, "Never");
    console.log("JWT token generated for user:", email);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token: jwtToken,
      user: user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

function generateStyleDescription(data) {
  let {
    height,
    occupation,
    bodyShape,
    overallStyle,
    clothingPreferences,
    fitPreference,
    specificFeatures,
    personalStyle,
    comfortVsStyle,
    build,
    ageRange
  } = data;

  // Construct sentence dynamically
  let description = `I'm a ${height?.toLowerCase()}, ${bodyShape?.toLowerCase()} person with a ${overallStyle?.toLowerCase()} style.`;

  if (clothingPreferences?.length) {
    description += ` I prefer ${clothingPreferences.join(
      ", "
    )} that are ${fitPreference?.toLowerCase()}.`;
  }

  if (specificFeatures) {
    description += ` I like to highlight my ${specificFeatures?.toLowerCase()}.`;
  }

  if (personalStyle) {
    description += ` ${personalStyle}`;
  }

  return description;
}

app.post("/instruction", async (req, res) => {
  try {
    console.log("Received request at /instruction with body:", req.body.instruction);

    const { userId, instruction } = req.body;

    // Find user by ID
    console.log("Looking for user with ID:", userId);
    const user = await UserModel.findById(userId);

    if (!user) {
      console.log("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const transformedInstruction = generateStyleDescription(instruction);

    // Update user's instruction field
    console.log("Updating user instruction...");
    user.instruction = transformedInstruction;
    await user.save();
    console.log("Instruction updated successfully");

    res.status(200).json({
      success: true,
      message: "Details submitted successfully.",
    });
  } catch (err) {
    console.error("Error updating instruction:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/instruction/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Fetching instruction for user ID:", userId);

    // Find the user
    const user = await UserModel.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Instruction retrieved successfully");

    res.status(200).json({
      success: true,
      instruction: user.instruction,
    });
  } catch (err) {
    console.error("Error fetching instruction:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.listen(3001, () => {
  console.log("Server is running on port : ", 3001);
});

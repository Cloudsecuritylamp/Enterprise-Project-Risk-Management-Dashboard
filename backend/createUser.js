require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "test@example.com";
    const password = "Password123";
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = new User({ email, passwordHash });
    await user.save();

    console.log("Test user created:", email);
    mongoose.disconnect();
  } catch (err) {
    console.error("Error creating test user:", err);
  }
}

createTestUser();

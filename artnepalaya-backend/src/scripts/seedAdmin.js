import mongoose from 'mongoose';
import { User } from '../modules/users/user.model.js';
import { env } from '../config/env.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("🔗 Connected to MongoDB...");

    const admin = await User.findOneAndUpdate(
      { email: "admin@artnepalaya.com" },
      { 
        $set: { 
          role: "Admin", 
          status: "active",
          username: "SuperAdmin",
          phoneNumber: "+9779800000000" 
        } 
      },
      { upsert: true, new: true, runValidators: true }
    );

    console.log("✅ Admin Active:", admin.email);
  } catch (error) {
    console.error("❌ Seed Failed:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

seedAdmin();
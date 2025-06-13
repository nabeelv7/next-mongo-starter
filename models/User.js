import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

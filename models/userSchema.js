const mongoose = require("mongoose")


const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },

        phone: { type: String },
        email: { type: String, required: true },
        userId: { type: String, },

        password: { type: String },
        role: { type: String },
        profileImage: { type: String },
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true, // This will automatically add createdAt and updatedAt fields
    }
)



const User = new mongoose.model("User", userSchema)
module.exports = User

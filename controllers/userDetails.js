const User = require("../models/userSchema")

const bcrypt = require("bcrypt")
const fs = require("fs")

var jwt = require("jsonwebtoken")


const getUser = async (data, callback) => {
    try {
        const { userId } = data
console.log(data);

        if (!userId) {
            return callback(null, {
                success: false,
                message: "Invalid User",
            })
        }

        // Find user by userId
        const user = await User.findOne({ userId: userId })
        console.log(" finding the user details from the user swervice", user)
        if (!user) {
            return callback(null, {
                success: false,
                message: "No User Found",
            })
        }

        if (!user.isActive) {
            return callback(null, {
                success: false,
                message: "User is not active",
            })
        }

        return callback(null, {
            success: true,
            message: "User retrieved successfully",
            user: user,
        })
    } catch (error) {
        console.error("Error fetching user:", error)
        return callback(null, {
            success: false,
            message: "Internal server error",
        })
    }
}
const createUserProfile = async (data, callback) => {
    console.log("this log is in the user service", data)

    try {
        const user = await User.create(data)

        console.log("the user creatd", user)

        return callback(null, {
            success: true,
            message: "User created successfully",
        })
    } catch (error) {
        console.error("Error fetching user:", error)
        return callback(null, {
            success: false,
            message: "Internal server error",
        })
    }
}

module.exports = {
    getUser,
    createUserProfile,
}

require("dotenv").config()
const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const mongoose = require("mongoose")
const path = require("path")

const PROTO_PATH = path.join(__dirname, "proto/user.proto")
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})
const userProto = grpc.loadPackageDefinition(packageDefinition).user
const { getUser, createUserProfile } = require("./controllers/userDetails")

mongoose.connect(process.env.USER_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const User = require("./models/userSchema") // Define User model in user-service/models/User.js

const server = new grpc.Server()

server.addService(userProto.UserService.service, {
    UpdateUser: async (call, callback) => {
        const { userId, firstName, lastName, profileImage } = call.request
        // Handle user update logic
    },
    GetUser: (call, callback) => getUser(call.request, callback),
    CreateUserProfile: (call, callback) =>
        createUserProfile(call.request, callback),
})

server.bindAsync(
    "0.0.0.0:50052",
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log("User gRPC server running on port 50052")
        server.start()
    }
)

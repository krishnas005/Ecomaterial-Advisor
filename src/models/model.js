import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    employeeID: {
        type: String,
        required: [true, "Please provide Employee ID"],
    }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
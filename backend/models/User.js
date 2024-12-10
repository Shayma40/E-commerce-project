const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Path `name` is required'], },
    email: { type: String, required: [true,'Email is required'], unique: true, },
    phone: { type: String },
    password: { type: String, required: [true, 'Password is required'], },
    isAdmin: { type: Boolean, default: false, },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });


// Method to generate reset password token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expiration time (1 hour from now)
    this.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    return resetToken;
};



const User = mongoose.model('User', userSchema);
module.exports = User;
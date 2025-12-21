const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

userSchema.methods.encryptPassword = function(password) {
    return crypto
        .createHash('sha1')
        .update(password)
        .digest('hex');
};

userSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

userSchema.virtual('password')
    .set(function(password) {
        this.hashedPassword = this.encryptPassword(password);
    });

module.exports.User = mongoose.model('User', userSchema);

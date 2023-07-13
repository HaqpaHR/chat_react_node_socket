const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, require: true, minlength: 3, maxlength: 20},
    email: {type: String, require: true, minlength: 10, maxlength: 30, unique: true},
    password: {type: String, require: true, minlength: 6}
}, {
    timestamps: true,
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;// or { Schema } = mongoose;
const userSchema = new Schema({
    googleId: String
});

//Create new collection called users using userSchema
//Only create if collection does not exist
mongoose.model('users', userSchema);

const mongoose = require('mongoose');

const blackListedTokens_Schema = new mongoose.Schema({
    token:{
        type: String,
        required: [true, "Token is required to be added in the blacklist"]
    }
},{
    timestamps: true
})

const blackListedTokens_Model = mongoose.model("blackListedToken", blackListedTokens_Schema);

module.exports = {
    blackListedTokens_Model
}
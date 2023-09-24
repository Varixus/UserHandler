const mongoose = require('mongoose');

module.exports = 
    mongoose.model('User', {
        userID: String,
        guildID: String,
        moneyAmount: Number,
    }, 'users' );
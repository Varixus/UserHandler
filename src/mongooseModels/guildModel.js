const mongoose = require('mongoose');

module.exports = 
    mongoose.model('Guild', {
        guildID: String,
        currencySymbol: String,
        workMin: Number,
        workMax: Number,
    }, 'guilds' );
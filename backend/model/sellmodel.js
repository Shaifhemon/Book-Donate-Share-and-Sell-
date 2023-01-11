const mongoose = require('mongoose')

const SellSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    B_section:{
        type: String,
        required: true
    },
    Book_Name:{
        type: String,
        required: true
    },
    Price:{
        type: String,
        required: true
    },
    addedBy:{
        type: String,
        default: "unknown"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Sell', SellSchema)
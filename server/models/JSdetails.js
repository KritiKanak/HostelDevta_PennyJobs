const mongoose = require('mongoose')
const { Schema } = mongoose;


const JSSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    experience:{
        type: String,
        required: true,
    },
    duration:{
        type:String,
        required: true,
    },
    education:{
        type:String,
        required:true,
    },
    skills:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('jsdetails', JSSchema)
const mongoose = require('mongoose')
const { Schema } = mongoose;


const EmployerSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    companyname:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    size:{
        type: String,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('employerdetails', EmployerSchema)
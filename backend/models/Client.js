const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:false},
    company:{type:String},
    status:{type:String,default:"active"},
    notes:{type:String},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})

const Client = mongoose.model('Client',clientSchema);

module.exports = Client
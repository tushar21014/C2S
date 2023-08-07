const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
    admin:{
        type: Boolean,
        default:false
    },
    salutation:{
        // type: Array,
        type: String,
        required: true,
        // default:[
        //     {name:'Mr.'},
        //     {name:'Mrs.'},
        //     {name:'Ms.'},
        //     {name:'Prof.'},
        //     {name:'Dr.'},
        // ]
    },
    first_name: {
        type: String,
        required: true
    },
    middle_name:{
        type: String
    },
    last_name:{
        type: String
    },
    designation:{
        type:String,
        required: true

    },
    department:{
        type:String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique : true
    },
    org_name: {
        type: String,
        required: true
        // required: true
    },
    address1:{
        type: String,
        required: true
    },
    address2:{
        type: String,
    },
    city:{
        type:String,
        required: true
    },
    zipCode:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    verify_token: {
        type : String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const user = mongoose.model('Users', userSchema)
module.exports = user;
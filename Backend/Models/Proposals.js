const mongoose = require('mongoose');

const { Schema } = mongoose;

const proposalSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    proposalId:{
        type: Number,
        // default: Date.now
    },
    organization_name:{
        type:String,
        required : true
    },
    category:{
        type:String,
        required: true
    },
    project_title:{
        type:String,
        required: true,
    },
    cid_name:{
        type:String,
        required:true
    },
    cid_designation:{
        type:String,
        required:true
    },
    cid_department:{
        type:String,
        required:true
    },
    cid_email:{
        type:String,
        required:true
    },
    cid_phone:{
        type:Number,
        required:true
    },
    proposal_file:{
        data: Buffer,
        contentType: String
    },
    proposal_file_time:{
        type:String
        // type:Int32Array,
        // default: Date.now
    },
    proposal_file_path:{
        type:String
    },
    proposal_access:{
        type:Boolean,
        default: false,
        required: true
    },
    proposal_submit:{
        type: Boolean
    }  
},{timestamps: true})

const proposal = mongoose.model('Proposal', proposalSchema)

module.exports = proposal
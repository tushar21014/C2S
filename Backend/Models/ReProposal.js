const mongoose = require('mongoose');

const { Schema } = mongoose;

const reproposalSchema = new Schema({
    parentProposal:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Proposal'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  
    },
    proposalId:{
        type: Number,
        required: true
        // default: Date.now
    },
    proposal_file_time:{
        type:String
        // type:Int32Array,
        // default: Date.now
    },
    proposal_file_path:{
        type:String,
        required: true
    },
    proposal_access:{
        type:Boolean,
        default: false,
        required: true
    }  
},{timestamps: true})

const reproposal = mongoose.model('Reproposal', reproposalSchema)

module.exports = reproposal
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    tag:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        enum: ['lost', 'found'],
        required:true
    },
    status:{
        type:Boolean, 
        required:true,
        default:false,
    },
    description:{
        type: String, 
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    datetime:{
        type:Date,
        required:true,
    },
    image:{
        public_id:{
            type:String, 
        },
        url:{
            type:String,
        }
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },

      claimedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
})

module.exports = mongoose.model("Item", itemSchema);
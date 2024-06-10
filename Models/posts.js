const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:false,
        default:"Lorem ipsum dolor sit amet, consectetur adipiscing..."
    },
    tags:{
        type:Array,
        required:false,
        default:[]
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref: "User" //connecting with user schema
    },
   views:{
        type:Number
    },
    comments:[
        {
            comment:{
                type:String
            },
            date:{
                type:Date,
                default:new Date()
            },
            userId:{
                type:mongoose.Schema.Types.ObjectId
            }
        }
    ]
},{
    timestamps: true
})

const postModel = mongoose.model('posts', postSchema);
module.exports = postModel;
import mongoose from 'mongoose'
 
const ContentSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
    },
    summary:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    picture:{
        type: String
    },
},{
    timestamps: true,
})

const ContentModel = mongoose.model('Content', ContentSchema)

export default ContentModel

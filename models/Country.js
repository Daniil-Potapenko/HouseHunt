import mongoose from 'mongoose'

const СountrySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    picture:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
})

const СountryModel = mongoose.model('Сountry', СountrySchema)

export default СountryModel

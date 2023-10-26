import mongoose from 'mongoose'
import { Schema } from 'mongoose'
 

const CitySchema = new mongoose.Schema({
    country:{ type: Schema.Types.ObjectId, ref: 'СountryModel' },
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

const CityModel = mongoose.model('City', CitySchema)

export default CityModel

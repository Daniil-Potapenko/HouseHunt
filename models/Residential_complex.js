import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const Residential_complexSchema = new mongoose.Schema({
    country:{ type: Schema.Types.ObjectId, ref: 'СountryModel' },
    city:{ type: Schema.Types.ObjectId, ref: 'CityModel' },
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

const Residential_complexModel = mongoose.model('Residential_complex', Residential_complexSchema)

export default Residential_complexModel

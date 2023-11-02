import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const ResidentialComplexSchema = new mongoose.Schema({
  city: {type: Schema.Types.ObjectId, ref: 'City'},
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const ResidentialComplexModel = mongoose.model('Residential_complex', ResidentialComplexSchema);

export default ResidentialComplexModel;

import CountryModel from '../models/Country.js';


export const createCountry = async (req, res) => {
  try {
    const country = new CountryModel({
      'name': req.body.name,
      'picture': req.body.picture,
      'picture_coordinates': req.body.picture_coordinates,
    });

    country.save().then(async () => {
      res.status(200).json({
        'success': 'true',
        'id': country.id,
      });
    });
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'Error, pls try later',
    });
    console.log(e);
  }
};
export const findCountry = async (req, res) => {
  try {
    const countryName = req.query.name;
    const countryId = req.query.id;
    let country;

    countryName ?
      country = await CountryModel.findOne({'name': countryName}) :
    countryId ?
      country = await CountryModel.findById(countryId) :
      country = await CountryModel.find();

    if (!country) {
      res.status(404).json({'message': 'Error, country not found'});
    } else {
      res.status(200).json(country);
    }
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'Error, pls try later',
    });
    console.log(e);
  }
};

export const deleteCountry = async (req, res) => {
  try {
    const countryName = req.query.name;
    const countryId = req.query.id;
    let country;

    countryName ?
      country = await CountryModel.findOneAndDelete({'name': countryName}) :
      countryId ?
        country = await CountryModel.findByIdAndDelete(countryId) : {};

    if (!country) {
      res.status(404).json({'message': 'Error, country not found'});
    } else {
      res.status(200).json({'Status': 'success'});
    }
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'Error, pls try later',
    });
    console.log(e);
  }
};


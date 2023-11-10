import CityModel from '../models/City.js';


export const createCity = async (req, res) => {
  try {
    const city = new CityModel({
      'name': req.body.name,
      'country': req.body.countryId,
      'picture': req.body.picture,
      'picture_coordinates': req.body.picture_coordinates,
    });

    city.save().then(async () => {
      res.status(200).json({
        'success': 'true',
        'id': city.id,
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
export const findCity = async (req, res) => {
  try {
    const cityName = req.query.name;
    const cityId = req.query.id;
    const countryId = req.query.countryId;
    let city;

    cityName ?
      city = await CityModel.findOne({'name': cityName}).populate('country') :
    cityId ?
      city = await CityModel.findById(cityId).populate('country') :
    countryId ?
      city = await CityModel.find({country: countryId}) : {};

    if (!city) {
      res.status(404).json({'message': 'Error, city not found'});
    } else {
      res.status(200).json(city);
    }
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'Error, pls try later',
    });
    console.log(e);
  }
};

export const deleteCity = async (req, res) => {
  try {
    const cityName = req.query.name;
    const cityId = req.query.id;
    let city;

    cityName ?
      city = await CityModel.findOneAndDelete({'name': cityName}) :
    cityId ?
      city = await CityModel.findByIdAndDelete(cityId) : {};

    if (!city) {
      res.status(404).json({'message': 'Error, city not found'});
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


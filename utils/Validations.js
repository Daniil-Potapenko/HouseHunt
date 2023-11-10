import {body, validationResult, query, oneOf} from 'express-validator';
import UserModel from '../models/User.js';
import CountryModel from '../models/Country.js';
import CityModel from '../models/City.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({errors: errors.array()});
  };
};


export const registrationSchema = [
  body('fullName').isLength({min: 3}),
  body('email').isEmail().custom(async (value) => {
    const userExist = UserModel.findOne({'email': value});

    if (await userExist) {
      throw new Error('Email already in use');
    }
  }),
  body('password').isLength({min: 5}),
];

export const dataEvaluateSchema = [
  body('id').isMongoId(),
  body('type').custom(async (value) => {
    const types = ['inc', 'dec'];

    if (!types.includes(value)) {
      throw new Error('type Error');
    }
  }),
];

export const authenticationSchema = [
  body('password').isLength({min: 4}),
  body('email').isEmail(),
];

/**
 *Alows only query "id","name", or null
 */
export const findCountryOrCitySchema = [
  query().custom(async (query) => {
    if (Object.keys(query).length>1) {
      throw new Error('Invalid query');
    }
  }),
  oneOf([
    [query('id').isMongoId()],
    [query('name').isString().isLength({max: 30, min: 2})],
    [query().custom(async (query) => {
      if (Object.keys(query).length>0) {
        throw new Error('Invalid query');
      }
    })],
  ]),
];

export const createCountrySchema = [
  body('picture').isURL({host_whitelist: [`${process.env.HOSTNAME}`]}),
  body('picture_coordinates').isArray({max: 2}),
  body('name').isString().isLength({min: 1, max: 30})
      .custom(async (value) => {
        const nameExist = CountryModel.findOne({'name': value});
        if (await nameExist) {
          throw new Error('Country aleredy exist');
        }
      }),
];

export const createCitySchema = [
  body('picture').isURL({host_whitelist: [`${process.env.HOSTNAME}`]}),
  body('picture_coordinates').isArray({max: 2}),
  body('name').isString().isLength({min: 1, max: 30})
      .custom(async (value) => {
        const nameExist = await CountryModel.findOne({'name': value});
        if (nameExist) {
          throw new Error('City aleredy exist');
        }
      }),
  body('country').custom(async (value)=>{
    const country = await CountryModel.findById(value);
    if (!country) {
      throw new Error('Country not found');
    }
  }),
];

export const createResidentialComplexSchema = [
  body('picture').isURL({host_whitelist: [`${process.env.HOSTNAME}`]}),
  body('picture_coordinates').isArray({max: 2}),
  body('name').isString().isLength({min: 1, max: 30}),
  body('city').custom(async (value)=>{
    const city = await CityModel.findById(value);
    if (!city) {
      throw new Error('City not found');
    }
  }),
];


import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js';

import * as CountryController from './controllers/CountryController.js';
import * as CityController from './controllers/CityController.js';
import * as ResidentialComplexController from './controllers/ResidentialComplexController.js';
import * as ContentController from './controllers/ContentController.js';
import * as UserController from './controllers/UserController.js';
import * as PictureController from './controllers/PictureController.js';
import {
  registrationSchema,
  authenticationSchema,
  validate,
  findCountrySchema,
  createCountrySchema,
} from './utils/Validations.js';

const app = express();
app.use(express.json());

mongoose
    .connect(`${process.env.DATABASEURL}`)
    .then(() => {
      console.log('DB OK');
    })
    .catch((err) => {
      console.log('DB ERROR', err);
    });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use('/uploads', express.static('uploads'));
app.post('/uploads', PictureController.upload.single('image'), UserController.checkAuth, PictureController.returnPathOfImage);

app.post('/user/registration', validate(registrationSchema), UserController.registration);
app.post('/user/login', validate(authenticationSchema), UserController.login);

app.post('/data/country', validate(createCountrySchema), UserController.checkAuth, CountryController.createCountry);
app.get('/data/country', validate(findCountrySchema), CountryController.findCountry);
app.get('/data/AllCountry', CountryController.findAllCountry);
app.delete('/data/country', validate(findCountrySchema), UserController.checkAuth, CountryController.deleteCountry);

app.post('/data/city', UserController.checkAuth, CityController.createCity);
app.get('/data/city', CityController.findCity);
app.get('/data/allCity', CityController.findAllCityInCountry);
app.delete('/data/city', UserController.checkAuth, CityController.deleteCity);

app.post('/data/residentialComplex', UserController.checkAuth, ResidentialComplexController.createResidentialComplex);
app.get('/data/residentialComplex', ResidentialComplexController.findResidentialComplex);
app.get('/data/allResidentialComplex', ResidentialComplexController.findAllResidentialComplexInCity);
app.delete('/data/residentialComplex', UserController.checkAuth, ResidentialComplexController.deleteResidentialComplex);

app.post('/data/content', UserController.checkAuth, ContentController.createContent);
app.get('/data/content', ContentController.findContent);
app.delete('/data/Content', UserController.checkAuth, ContentController.deleteContent);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(
        `Server OK - running at http://${process.env.HOSTNAME}:${process.env.PORT}`,
    );
  }
});

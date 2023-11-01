import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config.js'

import * as CountryController from "./controllers/CountryController.js"
import * as CityController from "./controllers/CityController.js"
import * as ResidentialComplexController from "./controllers/ResidentialComplexController.js"
import * as ContentController from "./controllers/ContentController.js"
import * as UserController from "./controllers/UserController.js"
import * as PictureController from "./controllers/PictureController.js"
import {registrationSchema, authenticationSchema, validate, getCountry_Schema, setCountry_Schema} from "./utils/Validations.js";


const app = express()
app.use(express.json())

mongoose
    .connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}/${process.env.DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('DB OK')
    })
    .catch((err) => {
        console.log('DB ERROR', err)
    })

app.use('/uploads', express.static('uploads'))
app.post('/uploads', PictureController.upload.single('image'), PictureController.returnPathOfImage)

app.post('/user/registration', validate(registrationSchema), UserController.registration)
app.post('/user/login', validate(authenticationSchema), UserController.login)

app.post('/data/country', validate(setCountry_Schema), CountryController.createCountry)
app.get('/data/country', validate(getCountry_Schema), CountryController.findCountry)
app.get('/data/AllCountry', CountryController.findAllCountry)
app.delete('/data/country', validate(getCountry_Schema), CountryController.deleteCountry)


app.post('/data/city', CityController.createCity)
app.get('/data/city', CityController.findCity)
app.get('/data/allCity', CityController.findAllCityInCountry)
app.delete('/data/city', CityController.deleteCity)
 
 

app.post('/data/residentialComplex', ResidentialComplexController.createResidentialComplex)
app.get('/data/residentialComplex', ResidentialComplexController.findResidentialComplex)
app.get('/data/allResidentialComplex', ResidentialComplexController.findAllResidentialComplexInCity)
app.delete('/data/residentialComplex', ResidentialComplexController.deleteResidentialComplex)

app.post('/data/content',  ContentController.createContent)
app.get('/data/content',  )
app.get('/data/allContent', )
app.delete('/data/Content', )


app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server OK - running at http://${process.env.HOSTNAME}:${process.env.PORT}`)
    }
})

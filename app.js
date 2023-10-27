import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config.js'

import * as CountryController from "./controllers/CountryController.js"
import * as CityController from "./controllers/CityController.js"
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

app.post('/data/country', validate(setCountry_Schema), CountryController.setCountry)
app.get('/data/country', validate(getCountry_Schema), CountryController.getCountry)
app.get('/data/AllCountry', CountryController.getAllCountry)
app.delete('/data/country', validate(getCountry_Schema), CountryController.deleteCountry)


app.post('/data/city', CityController.setCity)
app.get('/data/city', CityController.getCity)
 


app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server OK - running at http://${process.env.HOSTNAME}:${process.env.PORT}`)
    }
})

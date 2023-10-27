import CityModel from "../models/City.js";
import CountryModel from "../models/Country.js";
import 'dotenv/config.js'


export const setCity = async (req,res) => {
    try{
        const city = new CityModel({
            "name":req.body.name,
            "country":req.body.countryId,
            "picture":req.body.picture,
            "picture_coordinates":req.body.picture_coordinates
        })

        city.save().then(async () => {
            res.status(200).json({
                "success": "true"
            })
        })
    }
    catch (e) {
        res.status(500).json({
            "success": "false",
            "message": "registration error, pls try later"
        })
        console.log(e)
    }
}
export const getCity = async (req,res) => {
    try{
        const cityName = req.query.name
        const cityId = req.query.id
        let city 

        cityName?
            city = await  CityModel.findOne({'name':cityName}).populate('country'):
        cityId?
            city = await  CityModel.findById(cityId).populate('country'):{}
   
        if (!city) {
            res.status(404).json({ "message": "Error, city not found" })
        }
        else{
            res.status(200).json(city)
        }

    }
    catch (e) {
        res.status(500).json({
            "success": "false",
            "message": "Error, pls try later"
        })
        console.log(e)
    }
}
export const getAllCityInCuntry = async (req,res) => {
    try{
        const countryId = req.query.countryId
        let city = await CityModel.find({country:countryId})
        
        if (city=[]) {
            res.status(404).json({ "message": "Error, countrys not found" })
        }
        else{
            res.status(200).json(city)
        }

    }
    catch (e) {
        res.status(500).json({
            "success": "false",
            "message": "Error, pls try later"
        })
        console.log(e)
    }
}
// export const deleteCountry = async (req,res) => {
//     try{
//         const countryName = req.query.name
//         const countryId = req.query.id
//         let country 

//         countryName?
//             country = await  CountryModel.findOneAndDelete({'name':countryName}):
//         countryId?
//             country = await  CountryModel.findByIdAndDelete(countryId):{}
   
//         if (!country) {
//             res.status(404).json({ "message": "Error, country not found" })
//         }
//         else{
//             res.status(200).json({"Status":"success"})
//         }

//     }
//     catch (e) {
//         res.status(500).json({
//             "success": "false",
//             "message": "Error, pls try later"
//         })
//         console.log(e)
//     }
// }


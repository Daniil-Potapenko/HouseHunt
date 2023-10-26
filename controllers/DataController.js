import UserModel from "../models/User.js";
import CityModel from "../models/City.js";
import CountryModel from "../models/Country.js";
import ContentModel from "../models/Content.js";
import Residential_complexModel from "../models/Residential_complex.js";
import 'dotenv/config.js'


export const setCountry = async (req,res) => {
    try{
        const country = new CountryModel({
            "name":req.body.name,
            "picture":req.body.picture
        })

        country.save().then(async () => {
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
export const getCountry = async (req,res) => {
    try{
        const countryName = req.query.name
        const countryId = req.query.id
        let country 

        countryName?
            country = await  CountryModel.findOne({'name':countryName}):
        countryId?
            country = await  CountryModel.findById(countryId):{}
   
        if (!country) {
            res.status(404).json({ "message": "Error, country not found" })
        }
        else{
            res.status(200).json(country)
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
export const deleteCountry = async (req,res) => {
    try{
        const countryName = req.query.name
        const countryId = req.query.id
        let country 

        countryName?
            country = await  CountryModel.findOneAndDelete({'name':countryName}):
        countryId?
            country = await  CountryModel.findByIdAndDelete(countryId):{}
   
        if (!country) {
            res.status(404).json({ "message": "Error, country not found" })
        }
        else{
            res.status(200).json({"Status":"success"})
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



export const createCity = async (req,res) => {
    try{

    }
    catch (e) {
        res.status(500).json({
            "success": "false",
            "message": "registration error, pls try later"
        })
        console.log(e)
    }
}
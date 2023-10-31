import ResidentialComplexModel from "../models/ResidentialComplex.js";


export const createResidentialComplex = async (req,res) => {
    try{
        const residentialComplex = new ResidentialComplexModel({
            "name":req.body.name,
            "city":req.body.cityId,
            "picture":req.body.picture,
            "picture_coordinates":req.body.picture_coordinates
        })

        residentialComplex.save().then(async () => {
            res.status(200).json({
                "success": "true",
                "id":residentialComplex.id
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
export const findResidentialComplex = async (req,res) => {
    try{
        const residentialComplexName = req.query.name
        const residentialComplexId = req.query.id
        let residentialComplex 

        residentialComplexName?
            residentialComplex = await  ResidentialComplexModel.findOne({'name':residentialComplexName}).populate('city'):
        residentialComplexId?
            residentialComplex = await  ResidentialComplexModel.findById(residentialComplexId).populate('city'):{}
   
        if (!residentialComplex) {
            res.status(404).json({ "message": "Error, residentialComplex not found" })
        }
        else{
            res.status(200).json(residentialComplex)
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
export const findAllResidentialComplexInCity= async (req,res) => {
    try{
        const cityId = req.query.cityId
        let residentialComplex = await ResidentialComplexModel.find({city:cityId})

        if (residentialComplex=='') {
            res.status(404).json({ "message": "Error, residentialComplex not found" })
        }
        else{
            res.status(200).json(residentialComplex)
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
export const deleteResidentialComplex = async (req,res) => {
    try{
        const residentialComplexName = req.query.name
        const residentialComplexId = req.query.id
        let residentialComplex 

        residentialComplexName?
            residentialComplex = await  ResidentialComplexModel.findOneAndDelete({'name':residentialComplexName}):
        residentialComplexId?
            residentialComplex = await  ResidentialComplexModel.findByIdAndDelete(residentialComplexId):{}
   
        if (!residentialComplex) {
            res.status(404).json({ "message": "Error, residentialComplex not found" })
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


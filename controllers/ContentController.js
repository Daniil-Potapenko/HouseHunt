import ContentModel from '../models/Content.js'



export const createContent = async (req,res) =>{
    try{
       let content = new ContentModel({
        type:"",
        summary:"",
        description:"",
        picture:""
       })
    }
    catch (e) {
        res.status(500).json({
            "success": "false",
            "message": " error, pls try later"
        })
        console.log(e)
    }
}


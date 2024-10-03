
const {nanoid} = require('nanoid')
const Url = require('../models/url')

async function generateNewShortUrl(req,res){
    const id = nanoid(8)
    try {
        
        const body = req.body
        if(!body.url){
            return res.status(400).json({error:"url is required"})
        }

        await Url.create({
            shortId:id,
            redirectUrl:body.url,
            visitHistory:[]
        })
        return res.render('index',{id:id})
        // return res.json({id:id})

    } catch (error) {
        console.log(error)
    }
}


module.exports = { generateNewShortUrl}
const express=require('express')
const router=express.Router()
const Connectlog=require('../schema/connectlog')

router.post("/connectlog",async(req,res)=>{
    try{
    const connectionEntry = new Connectlog();
    await connectionEntry.save();
    res.status(200).json({ message: 'Connection logged successfully' });

    }
    catch(error){
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
module.exports = router;
const express = require("express");
const messageBird = require("messagebird")(process.env.api);
const router = express.Router();

router.post('/phone',(req,res)=>{
    const number = req.body.number;
    messageBird.verify.create(number,{
        template:'your verification code is %token'
    },function(err,response){
        if(err){
            console.log(err);
            res.status(400).send({error:err.essors[0].description});
        }else{
            console.log(response);
            res.status(200).send({
                id:response.id
            });
        }
    })
})

router.post('/verify',(req,res)=>{
    const id = req.body.id;
    const token = req.body.token;
    console.log(id);
    messageBird.verify.verify(id,token,function(err,response){
        if(err){
            console.log(err);
            res.status(422).send({error:err.errors[0].description});
        }else{
            console.log(response);
            res.status(200).send({
                success:"your number is verify"
            });
        }
    });
})


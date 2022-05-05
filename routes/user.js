const User = require('../models/user')
const CryptoJS = require('crypto-js')
const route = require('express').Router()

route.post('/register', async (req,res) =>{
            try{
                const newUser = new User({
                    username : req.body.username,
                    email: req.body.email,
                    password: CryptoJS.AES.encrypt(
                        req.body.password,
                        process.env.hash_secret
                      ).toString()
                })
                const user = await newUser.save()
                console.log('User created')
                res.send(user)
            }catch(err){
                    console.log(err)
            }
           
})
route.put("/changepassword/:id", async (req,res ) =>{
    if(req.params.id === req.body.id){
        const user = await User.findByIdAndUpdate(req.body.id, { $set : req.body})
        res.send("user is udpadted")
    }else{
        res.send("you cannot change other passwrd")
    }
})
route.delete("/delete/:id" , async (req,res) =>{
    if(req.params.id === req.body.id){
        const user = await User.findByIdAndDelete(req.body.id)
        res.send("deleted")
    }else{
        res.send("you cannot change other passwrd")
    }
})
route.post('/login' , async (req,res) =>{
     try{
         const user = await User.findOne({email: req.body.email});
         if(!user){
             res.statusCode(404).send("Incorrect email")
         }
         const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.secret
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
         if(req.body.password === originalPassword){
             res.send(user)
         }else{
             res.send('incorrect password')
         }

     }catch(err){
         res.send(err)
     }
})
module.exports = route
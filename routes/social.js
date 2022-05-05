const User = require('../models/user')
const route = require('express').Router()
const Post = require('../models/post')

route.post('/follow/:id' , async (req,res) =>{
   if(req.body.id !== req.params.id){
       try{
            const tofollowe = await User.findById(req.params.id)
            const followby = await User.findById(req.body.id)
            if( !followby.followers.includes(req.params.id)){
                await followby.updateOne ({ $push :{ followers : req.params.id}})
                await tofollowe.updateOne ({ $push :{ following : req.body.id}})
                res.send("user has been followed")
            }else{
                res.send("You already follow user")
            }
        }catch(err){
            console.log(err)
       }
   } else{
       res.send("You can follow yourself")
   }
})
route.post('/unfollow/:id', async (req,res) =>{
    if(req.body.id !== req.params.id){
        try{
             const tounfollow = await User.findById(req.params.id)
             const unfollowby = await User.findById(req.body.id)
             if( unfollowby.followers.includes(req.params.id)){
                 await unfollowby.updateOne ({ $pull :{ followers : req.params.id}})
                 await tounfollow.updateOne ({ $pull :{ following : req.body.id}})
                 res.send("user has been unfollowed")
             }else{
                 res.send("You dont follow ")
             }
         }catch(err){
             console.log(err)
        }
    } else{
        res.send("You cant unfollow yourself")
    }
})
route.post('/addpost',async  (req,res) =>{
    try{
        const post = new Post (req.body)
        await post.save()
        res.send(post)
    }catch(err){
        res.send(err)
    }
})
route.post('/addlike/:id', async (req,res) =>{
    try{
         const post = await Post.findById(req.params.id)
         if(!post.likes.includes(req.body.id)){
            await post.updateOne({ $push: { likes: req.body.id } });
            res.send("Like is added")
        }
        else{
            await post.updateOne({ $pull : { likes : req.body.id}})
            res.send("Like is removed")
        }
    }catch(err){
        console.log(err)
    }
   
    
})
module.exports = route
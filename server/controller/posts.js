 const  mongoose  = require("mongoose");
const postMessage = require("../model/postMessage");
// const { post } = require("../route/routes");
 
 const getPosts = async(req,res)=>{
try {
    const postMessages =await postMessage.find()
    console.log("post:",postMessages);

   return res.status(200).json(postMessages)
} catch (error) {
    res.status(404).json({message:error.message})
}

}
 const createPost =async(req,res)=>{
const post = req.body
const newPost = new postMessage({...post,creator:req.userId,createdAt :new Date().toISOString()})
try {
    await newPost.save()
    res.status(200).json(newPost)
} catch (error) {
    res.status(401).json({message:error.message})
}

}

const updatedPost = async (req,res)=>{

    const {id : _id} = req.params

    const post = req.body
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(401).send("no post with that id")

 const updatedPost=   await postMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})

res.status(200).json(updatedPost)

}


const deletePost = async (req,res)=>{
    const {id : _id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(401).send("no post with that id")

   await postMessage.findByIdAndRemove(_id)
   res.json({message : "deleted suucessfuly"})

}

const likedPost = async(req,res)=>{
    try {


        const {id : _id} = req.params
if(!req.userId) return res.json({message:"Unauthenticated"})

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(401).send("no post with that id")
          const post = await postMessage.findById(_id)

          const index = post.likes.findIndex((_id)=>_id=== String(req.userId))

          if(index===-1){
            post.likes.push(req.userId)
          }else{
            post.likes =post.likes.filter((_id)=>_id!==String(req.userId))
          }


          console.log("post,",post);
    const updatedPost = await postMessage.findByIdAndUpdate(_id,post,{new:true})
        res.json(updatedPost)
    } catch (error) {
        res.status(402).json({message:error.message})
    }
}
module.exports={
    getPosts,
    createPost,
    updatedPost,
    deletePost,
    likedPost
}
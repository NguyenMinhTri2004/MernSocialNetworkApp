const Posts = require('../Models/postModel')
const Comments = require('../Models/commentModel')
const Users = require('../Models/userModel')

class APIfeatures {
   constructor(query , queryString) {
      this.query = query
      this.queryString = queryString

   }

   paginating() {
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 6
      const skip = (page - 1) * limit
      this.query = this.query.skip(skip).limit(limit)
      return this
   }
}


const postController = {
    createPost : async (req, res) => {
       try {

      //   const features = new APIfeatures()
        const {content , images} = req.body

        if(images.length === 0) {
            return res.status(400).json({msg: "Please add your image"})
        }

        const newPost = new Posts({
            content,
            images,
            user : req.user._id
        })

        await newPost.save()

        res.json({
            msg : "Created Post",
            newPost : {
               ...newPost._doc,
               user : req.user
            }
        })

       }catch (err) {
          return res.status(500).json({msg : err.message})
       }
    },

    getPosts : async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({
               user : [...req.user.following , req.user._id]
               }) , req.query).paginating()

            const posts = await features.query.sort('-createdAt')
            .populate("user likes" , "avatar username fullname followers")
            .populate({
               path : "comments",
               populate : {
                  path : "user likes",
                  select : "-password"
               }
            })

            res.json({
                msg : "Success",
                result : posts.length,
                posts
            })
 
        }catch (err) {
           return res.status(500).json({msg : "aaa"})
        }
    },

    updatePost : async (req, res) => {
        try {
           const {content , images} = req.body
           const post = await Posts.findOneAndUpdate({_id : req.params.id}, {
            content , images
           }).populate("user likes" , "avatar username fullname")

           res.json({
              msg : "Update Post",
              newPost : {
                ...post._doc,
                content,
                images
              }
           })
 
        }catch (err) {
           return res.status(500).json({msg : "aaa"})
        }
    },

    likePost : async (req, res) => {
        try {
        const like = await Posts.findOneAndUpdate({_id : req.params.id} , {
              $push : {likes : req.user._id}
           } , {new : true})

           res.json({msg : "Liked post"})

           if(!like) {
            return res.status(404).json({msg : "This post not exits"})
          }

        }catch (err) {
           return res.status(500).json({msg : "aaa"})
        }
    },

    unLikePost : async (req, res) => {
        try {
         const like =  await Posts.findOneAndUpdate({_id : req.params.id} , {
              $pull : {likes : req.user._id}
           } , {new : true})

           if(!like) {
            return res.status(404).json({msg : "This post not exits"})
          }
           res.json({msg : "Unliked post"})
        }catch (err) {
           return res.status(500).json({msg : "aaa"})
        }
    },

    getUserPosts : async (req, res) => {
      try {
         const features = new APIfeatures(Posts.find({
            user : req.params.id
         }) , req.query)
         .paginating()

         const posts = await features.query.sort("-createdAt")


         res.json({
            posts,
            result : posts.length,
            
         })

         
      }catch (err) {
         return res.status(500).json({msg : "aaa"})
      }
    },

   getPost : async (req, res) => {
      try {
        
         const post = await Posts.findById(req.params.id)
         .populate("user likes" , "avatar username fullname followers ")
         .populate({
            path : "comments",
            populate : {
               path : "user likes",
               select : "-password"
            }
         })

         if(!post) {
            return res.status(404).json({msg : "This post not exits"})
          }

         res.json({
            post
         })

         
      }catch (err) {
         return res.status(500).json({msg : "aaa"})
      }
   },

   getPostsDiscovery : async (req, res) => {
            
      try {
         const features = new APIfeatures(Posts.find({
            user :  [...req.user.following , req.user._id]
            }) , req.query).paginating()

         const posts = await features.query.sort('-createdAt')
         

         res.json({
            msg : "Success",
            result : posts.length,
            posts,
            
         })
    }catch (err) {
      return res.status(500).json({msg : err.message})
    }
      
     
   },

   deletePost : async  (req, res) => {
      try {
         const post = await Posts.findOneAndDelete({
            _id : req.params.id,
             user : req.user._id
         })

         await Comments.deleteMany({
            _id : {
               $in : post.comments
            }
         })

         res.json({
            msg : 'Delete Post !',
            newPost : {
               ...post,
               user : req.user
            }
         })

      }catch (err) {
         return res.status(500).json({msg : err.message})
      }
   },

   savePost : async  (req, res) => {
      try {
         const save = await Users.findOneAndUpdate({_id : req.user._id} , {
               $push : {saved : req.params.id}
            } , {new : true})
 
            
 
            if(!save) {
             return res.status(404).json({msg : "This post not exits"})
           }

           res.json({msg : "Saved post"})
 
         }catch (err) {
            return res.status(500).json({msg : "aaa"})
         }
   },


   unSavePost : async  (req, res) => {
      try {
         const save = await Users.findOneAndUpdate({_id : req.user._id} , {
               $pull : {saved : req.params.id}
            } , {new : true})
 
            
 
            if(!save) {
             return res.status(404).json({msg : "This post not exits"})
           }

           res.json({msg : "Unsaved post"})
 
         }catch (err) {
            return res.status(500).json({msg : "aaa"})
         }
   },

   getSavePosts : async  (req, res) => {
      try {
           const features = new APIfeatures(Posts.find({
              _id : {$in : req.user.saved}
           }), req.query).paginating()

           const savePosts = await features.query.sort('-createdAt')

           res.json({
               savePosts,
               result : savePosts.length
           })
 
         }catch (err) {
            return res.status(500).json({msg : "aaa"})
         }
   },
}


module.exports = postController 
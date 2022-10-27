const router = require("express").Router()


const posts = require("../controller/posts")

const auth = require("../middleware/auth")

router.get("/",posts.getPosts)
router.post("/",auth,posts.createPost)
router.patch("/:id",auth,posts.updatedPost)
router.delete("/:id",auth,posts.deletePost)
router.patch("/:id/likePost",auth,posts.likedPost)
module.exports = router
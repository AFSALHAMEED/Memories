const router = require("express").Router()


const posts = require("../controller/user")

router.post("/signIn",posts.signIn)
router.post("/signUp",posts.signUp)

module.exports = router
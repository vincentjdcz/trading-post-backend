const express = require("express");
const {createPostHandler, getPostsHandler, getPostHandler, getOwnPostsHandler, getOthersPostsHandler } = require("../../controllers/post/controller")
//modifyPostHandler, deletePostHandler, getPostHandler, 
const router = express.Router();
router.post("/createPost", createPostHandler)
router.get("/getPosts", getPostsHandler);
router.post("/getOwnPosts", getOwnPostsHandler);
router.post("/getOthersPosts", getOthersPostsHandler);
router.get("/getPost/:id", getPostHandler);
/*
router.put("/modifyPost", modifyPostHandler);

router.delete("/deletePost", deletePostHandler);



*/

module.exports = router;
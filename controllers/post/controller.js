const Post = require("../../models/post/model");

const createPostHandler = async (req, res) => {
  try {
    console.log("CreatePostHandler userId: ", req.userId);
    const newPost = new Post({
      userId: req.body.userId,
      cardApiId: req.body.cardApiId,
      cardFrontPicture: req.body.cardFrontPicture,
      cardBackPicture: req.body.cardBackPicture,
      wants: req.body.wants,
      wantsImgs: req.body.wantsImgs,
    });

    if (newPost) {
      await newPost.save();
      console.log("new post saved");
      res.status(201).json({
        userId: newPost.userId,
        _cardApiId: newPost.cardApiId,
        cardFrontPicture: newPost.cardFrontPicture,
        cardBackPicture: newPost.cardBackPicture,
        wants: newPost.wants,
        wantsImgs: newPost.wantsImgs,
      });
    } else {
      res.status(400).json({ error: "Failed to create Post" });
    }
  } catch (error) {
    console.log("Error in admin Post controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getOwnPostsHandler = async (req, res) => {
  try {
    const { userId } = req.body; 
    const posts = await Post.find({ userId: userId }); 
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getting own posts: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getOthersPostsHandler = async (req, res) => {
  try {
    const { userId } = req.body; 
    const posts = await Post.find({ userId: { $ne: userId } });
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getting other posts: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getPostsHandler = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find(); // This will return all posts in the 'posts' collection

    // Send the posts as a response
    res.status(200).json(posts);

    //TODO: Implement pagination later
  } catch (error) {
    console.log("Error in admin Post controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getPostHandler = async (req, res) => {
  try {
    // Extract postId from the URL parameters
    const postId = req.params.id;

    // Fetch the post by its _id from the database
    const post = await Post.findById(postId);

    // If no post is found, return a 404 response
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // If post is found, return the post data in the response
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in admin Post controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPostHandler,
  getPostsHandler,
  getPostHandler,
  getOwnPostsHandler,
  getOthersPostsHandler,
};

const postModel = require('../Models/posts');


const getPosts = async (req, res)=>{
    const pageNo = req.query.pageno * 1;
    // console.log(pageNo);
    const postsList = await postModel.find()
    .sort({views:1}) //to sort depention on a key
    .skip((pageNo - 1) *10 ) //to skip how many posta
    .limit(10) //to limit post for each page
    .populate({
        path:'userId',
        select:'-password' //excude files add - before
    }); //populating user collection inside posts collection
    res.json({
        result: postsList
    })
}

const createPost = async (req, res) => {

    console.log(req.user._id) //req.user = stores user object
    const newPost = new postModel({...req.body, userId: req.user._id});
    await newPost.save();
    res.json({
        message:'Post created Successfully'
    })
}

const getPostById = async (req, res) => {
    const postId = req.params.id;
    const post = await postModel.findById(postId).populate({
        path:"userId",
        select:'-password'
    }); //finding post with id in db

    res.json({
        result:post
    })
}

const editPost = async (req, res) => {

    
    const postId = req.params.id;
//write find query to find the post
    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    //match user id with the post's user id
console.log(post.userId._id);
console.log(req.user._id);
    if(!post.userId.equals(req.user._id)){
        return res.status(403).json({ message: 'Unauthorized action' });
    }

    await postModel.findByIdAndUpdate(postId, req.body)
    res.json({
        message:'Post edited successfully'
    })
}

const deletePost = async (req, res) => {
    const postId = req.params.id;
    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    if(!post.userId.equals(req.user._id)){
        return res.status(403).json({ message: 'Unauthorized action' });
    }

    await postModel.findByIdAndDelete(postId);
    res.json({
        message:'Post Deleted Successfully'
    })
}

const postComment = async (req, res) => {

    const postId = req.params.postId;
    // await PostModel.findByIdAndUpdate(postId);
    await postModel.updateOne(
        { _id: req.params.postId },
        {
          $push: {
            comments: { comment: req.body.comment, userId: req.user._id },
          },
        }
      );
      res.json({ msg: "Comment posted successfully" });
}

const editComment = async (req, res) => {
    try {
      const commentId = req.params.id; // Assumes commentId is provided in the URL as :id
      const updatedComment = req.body.comment; // Assumes the new comment text is provided in the request body
  
      // Find the post containing the comment by the commentId and update the specific comment text
      const result = await postModel.updateOne(
        { "comments._id": commentId }, // Find the comment by its ID within any post
        {
          $set: {
            "comments.$.comment": updatedComment, // Update the specific comment text
          },
        }
      );
  
      if (result.nModified === 0) {
        return res.status(404).json({ msg: "Comment not found" });
      }
  
      res.json({ msg: "Comment updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Error updating comment", error });
    }
  };

  const deleteComment = async (req, res) => {
    try {
      const commentId = req.params.id; // Assumes commentId is provided in the URL as :id
  
      // Find the post containing the comment by the commentId and remove the specific comment
      const result = await postModel.updateOne(
        { "comments._id": commentId }, // Find the comment by its ID within any post
        {
          $pull: { comments: { _id: commentId } } // Remove the specific comment
        }
      );
  
      if (result.nModified === 0) {
        return res.status(404).json({ msg: "Comment not found" });
      }
  
      res.json({ msg: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Error deleting comment", error });
    }
  };
  
  
  

const postController = {
    getPosts,
    createPost,
    getPostById,
    editPost,
    deletePost,
    postComment,
    editComment,
    deleteComment
}

module.exports = postController;
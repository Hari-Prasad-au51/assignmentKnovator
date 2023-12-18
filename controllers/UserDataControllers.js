const PostSchema = require("../model/Userdata")

const postData = async (req, res) => {
    try {
        const { title, body, latitude, longitude } = req.body;
        const createdBy = req.user._id;
        const newPost = new PostSchema({
          title,
          body,
          createdBy,
          geoLocation: { latitude, longitude },
        });
    
        const post = await newPost.save();
        res.json(post);
      } catch (error) {
        console.error('Create Post error:', error);
        res.status(500).json({ message: 'Failed to create post' });
      }
}
const getData = async (req, res) => {
    try {
      const createdBy = req.user._id;
      const posts = await PostSchema.find({ createdBy });
      res.json(posts);
    } catch (error) {
      console.error('Get Posts error:', error);
      res.status(500).json({ message: 'Failed to get posts' });
    }
  };
  const updateData = async (req, res) => {
    try {
      const { title, body, latitude, longitude, active } = req.body;
      const postId = req.params.postId;
      const createdBy = req.user._id;
  console.log(title,body,postId)
      const updatedPost = await PostSchema.findOneAndUpdate(
        { _id: postId, createdBy },
        { title, body, geoLocation: { latitude, longitude }, active },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found or you do not have permission to update it' });
      }
  
      res.json(updatedPost);
    } catch (error) {
      console.error('Update Post error:', error);
      res.status(500).json({ message: 'Failed to update post' });
    }
  };
  const DeleteData = async (req, res) => {
    try {
      const postId = req.params.postId;
      const createdBy = req.user._id;
  console.log(postId)
      const deletedPost = await PostSchema.findOneAndDelete({ _id: postId, createdBy });
  
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found or you do not have permission to delete it' });
      }
  
      res.json(deletedPost);
    } catch (error) {
      console.error('Delete Post error:', error);
      res.status(500).json({ message: 'Failed to delete post' });
    }
  };
  const getByLocation = async (req,res) =>{
    try {
        const { latitude, longitude } = req.params;
    
        const posts = await PostSchema.find({
          'geoLocation.latitude': latitude,
          'geoLocation.longitude': longitude,
        });
    
        res.json(posts);
      } catch (error) {
        console.error('Retrieve Posts by Location error:', error);
        res.status(500).json({ message: 'Failed to retrieve posts by location' });
      }
  }
 const getPostCounts = async(req, res) =>{
    try {
        const activeCount = await PostSchema.countDocuments({ active: true });
        const inactiveCount = await PostSchema.countDocuments({ active: false });
    
        res.json({ activeCount, inactiveCount });
      } catch (error) {
        console.error('Get Post Count error:', error);
        res.status(500).json({ message: 'Failed to get post count' });
      }
 }

module.exports = {
    postData,
    getData,
    updateData,
    DeleteData,
    getByLocation,
    getPostCounts
}

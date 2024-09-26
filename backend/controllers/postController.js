import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';
import { errorHandler } from '../utils/error.js';



export const create = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id, 
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};




export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const query = {};
    if (req.query.userId) query.userId = req.query.userId;
    if (req.query.category) query.category = req.query.category; 
    if (req.query.slug) query.slug = req.query.slug;
    if (req.query.postId) query._id = req.query.postId;

    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: 'i' } }, 
      ];
    }

    const posts = await Post.find(query)
      .populate('userId', 'username profilePicture')
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);

    res.status(200).json({
      posts,
      totalPosts,
    });
  } catch (error) {
    next(error);
  }
};










export const deletepost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await Comment.deleteMany({ postId: postId });
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: 'Post and associated comments deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    if (!updatedPost) {
      return next(errorHandler(404, 'Post not found'));
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};





export const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      message: 'Post liked/unliked successfully',
      likes: post.likes.length
    });
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const getPostsByCategory = async (req, res, next) => {
  try {
    const category = req.params.category; 
    console.log('Received category:', category); 

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({ category })
      .populate('userId', 'username profilePicture') 
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments({ category });

    res.status(200).json({
      posts,
      totalPosts,
    });
  } catch (error) {
    next(error);
  }
};





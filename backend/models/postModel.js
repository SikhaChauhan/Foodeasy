import mongoose from 'mongoose';
import Comment from './commentModel.js'; 

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    category: {
      type: String,
      default: 'uncategorized',
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId], 
      ref: 'User',
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

postSchema.pre('findOneAndDelete', async function (next) {
  try {
    const docToDelete = await this.model.findOne(this.getQuery());
    if (docToDelete) {
      await Comment.deleteMany({ postId: docToDelete._id });
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Post = mongoose.model('Post', postSchema);

export default Post;




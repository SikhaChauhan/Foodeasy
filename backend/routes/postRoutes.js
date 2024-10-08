import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts,  updatepost, likePost, getPostsByCategory} from '../controllers/postController.js';

const router = express.Router();

router.post('/create-post', verifyToken, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)
router.post('/like/:postId', verifyToken, likePost);
router.get('/category/:category', getPostsByCategory);

export default router;



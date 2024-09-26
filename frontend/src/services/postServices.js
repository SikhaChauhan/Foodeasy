import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const getPostDetails = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${postId}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching post details:', error);
        throw error; 
    }
};

export const likePost = async (postId, userId) => {
    try {
        const response = await axios.post(`${API_URL}/posts/${postId}/like`, { userId });
        return response.data; 
    } catch (error) {
        console.error('Error liking post:', error);
        throw error; 
    }
};

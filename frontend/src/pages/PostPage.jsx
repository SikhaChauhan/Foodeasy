import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faHeart as faHeartRegular } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          console.error('API Error:', res.statusText);
          setLoading(false);
          return;
        }

        if (!data.posts.length) {
          setError(true);
          console.warn('No posts found for the provided slug.');
          setLoading(false);
          return;
        }

        const fetchedPost = data.posts[0];
        setPost(fetchedPost);
        setLiked(fetchedPost.likes.includes(currentUser?._id));
        setLikeCount(fetchedPost.likes.length);

        if (fetchedPost.userId && typeof fetchedPost.userId === 'object') {
          const userId = fetchedPost.userId._id;
          const userRes = await fetch(`/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const userData = await userRes.json();

          if (userRes.ok) {
            setUser(userData);
          } else {
            console.error('Failed to fetch user data:', userRes.statusText);
            setError(true);
          }
        }

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error('Error fetching post or user:', error);
      }
    };
    fetchPost();
  }, [postSlug, currentUser?._id]);

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/post/like/${post._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) {
        console.error('Failed to like post:', await res.text());
        return;
      }

      const data = await res.json();
      setLiked(!liked);
      setLikeCount(data.likes);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <p className='font-semibold text-red-500'>Error loading post. Please try again later.</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <p className='text-gray-500'>Post not found.</p>
      </div>
    );
  }

  return (
    <main className='flex flex-col p-8 mx-auto bg-white border border-gray-200 rounded-lg shadow-2xl max-w-screen'>
      <div className='flex flex-col p-4 mt-4 mb-6 bg-white rounded-lg shadow-xl ml-9 mr-9' style={{boxShadow: '0 4px 15px rgba(0.5,0.5,0.5,0.5)'}}>
        <div className='flex justify-center mb-6'>
          <h1 className='text-3xl font-bold text-center text-gray-800'>{post.title}</h1>
        </div>

        {/* Post Image */}
        <div className='flex justify-center mb-4'>
          <img
            src={post.image}
            alt={post.title}
            className='md:max-w-[60%] w-full md:h-auto md:rounded-xl md:mx-auto' // Removed margin-bottom
            style={{ objectFit: 'cover', maxHeight: '590px', boxShadow: '0 4px 15px rgba(0.5,0.5,0.5,0.5)' }}
          />
        </div>

        {/* Category */}
        <div className='flex justify-center mb-4'>
          <span className='font-bold text-black text-md'>{post.category || 'Uncategorized'}</span>
        </div>
        <div className='flex items-center mb-6 ml-6'>
          <Button
            onClick={handleLike}
            className={`flex items-center gap-3 ml-9  px-4 py-2 text-sm font-medium ${liked ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            <FontAwesomeIcon
              icon={liked ? faHeartSolid : faHeartRegular}
              className={`ml-2 mr-2 text-lg ${liked ? 'text-white ' : 'text-gray-600'}`}
            />
            {liked ? 'Liked' : 'Like'}
          </Button>
          <span className='ml-2 text-sm text-black'>{likeCount} Like{likeCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
      {/* Post Content */}
      <div
        className='p-4 mb-6 leading-relaxed text-black rounded-lg shadow-xl bg-gradient-to-r from-orange-50 via-red-100 to-orange-50 mr-9 post-content ml-9'
        style={{boxShadow: '0 4px 15px rgba(0.5,0.5,0.5,0.5)'}} // Custom shadow for top visibility
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      {/* Comment Section */}
      <div className='pt-6 border-t border-gray-200'>
        <CommentSection postId={post._id} />
      </div>
    </main>
  );
}


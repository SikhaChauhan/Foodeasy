import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    // searchTerm: '',
    sort: 'desc',
    category: 'Select',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    // const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    setSidebarData({
      // searchTerm: searchTermFromUrl || '',
      sort: sortFromUrl || 'desc',
      category: categoryFromUrl || 'Select',
    });

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
      setShowMore(data.posts.length === 9);
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (res.ok) {
      const data = await res.json();
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setShowMore(data.posts.length === 9);
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='border-b border-gray-500 p-7 md:border-r md:min-h-screen'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value='Select'>Select</option>
              <option value='Breakfast'>Breakfast</option>
              <option value='Main Course'>Main Course</option>
              <option value='Dessert'>Dessert</option>
              <option value='Snack'>Snack</option>
              <option value='Beverage'>Beverage</option>
            </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='p-3 mt-5 text-3xl font-semibold border-gray-500 sm:border-b '>
          Posts results:
        </h1>
        <div className='flex flex-wrap gap-4 p-7'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-lg text-teal-500 hover:underline p-7'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

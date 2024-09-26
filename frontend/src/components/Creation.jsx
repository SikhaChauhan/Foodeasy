import { Alert, Button, FileInput, Select } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function Creation() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
  });
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.image || !formData.category) {
      setPublishError('Please provide all required fields');
      return;
    }
    try {
      const res = await fetch('/api/post/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
      console.log(error);
    }
  };

  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],  // Font and size dropdowns
      ['bold', 'italic', 'underline', 'strike'],  // Bold, italic, underline, and strikethrough
      [{ 'color': [] }, { 'background': [] }],  // Text color and background color
      [{ 'script': 'sub' }, { 'script': 'super' }],  // Subscript and superscript
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote'],  // Headers and blockquote
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // Ordered and unordered lists
      [{ 'align': [] }],  // Alignment options
      ['link', 'image', 'video'],  // Link, image, and video embedding
      ['clean'],  // Clear formatting
    ],
  };

  const formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script', 'super', 'sub',
    'header', 'blockquote',
    'list', 'bullet', 'align',
    'link', 'image', 'video',
  ];

  return (
    <div className='max-w-screen-xl p-6 mx-auto bg-white rounded-lg'>
      <h1 className='mb-6 text-4xl font-bold text-center text-orange-600'>Create a New Post</h1>
      <form className='space-y-6' onSubmit={handleSubmit}>
        <div className='flex items-center justify-center w-full'>
          <label
            htmlFor='image-upload'
            className='flex flex-col items-center justify-center w-40 h-40 bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200'
          >
            {formData.image ? (
              <img
                src={formData.image}
                alt='Uploaded'
                className='object-cover w-full h-full rounded-lg'
              />
            ) : (
              <div className='flex flex-col items-center justify-center'>
                <span className='text-xl text-gray-400'>+</span>
                <p className='text-sm text-gray-500'>Upload Image</p>
              </div>
            )}
            <FileInput
              id='image-upload'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>

        <Button
          type='button'
          className='w-full py-1 text-white rounded-lg bg-gradient-to-r from-cyan-600 to-pink-600 hover:bg-blue-600'
          onClick={handleUploadImage}
          disabled={imageUploadProgress}
        >
          {imageUploadProgress ? (
            <div className='w-10 h-10'>
              <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`} />
            </div>
          ) : (
            'Upload Image'
          )}
        </Button>

        {/* Display Image Upload Error */}
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}

        {/* Title Input */}
        <input
          type='text'
          placeholder='Enter post title'
          required
          id='title'
          className='w-full p-3 border rounded-lg outline-none pl-9 pr-9 focus:ring-2 focus:ring-blue-500'
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        {/* Category Input */}
        <Select
          className='w-full p-1 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value='' disabled>
            Select category
          </option>
          <option value='Appetizer'>Breakfast</option>
          <option value='Main Course'>Main Course</option>
          <option value='Dessert'>Dessert</option>
          <option value='Snack'>Snack</option>
          <option value='Drinks'>Drinks</option>
        </Select>

        {/* Content Input */}
        <ReactQuill
          theme='snow'
          modules={modules}
          formats={formats}
          className='mb-3 h-72 dark:text-white'
          placeholder='Write your content here...'
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        {/* Submit Button */}
        <div className='mt-4'>
          <Button type='submit' className='w-full mt-4 text-white bg-pink-500 hover:bg-pink-600'>
            Post
          </Button>
        </div>

        {/* Display Publish Error */}
        {publishError && <Alert className='mt-5' color='failure'>
          {publishError}
        </Alert>}
      </form>
    </div>
  );
}

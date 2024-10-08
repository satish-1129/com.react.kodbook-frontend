import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // React Router hook
import Navbar from '../components/Navbar'

export default function NewPost() {

  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('photo', photo);
    formData.append('username',sessionStorage.getItem('username'))
    
    try {
      const response = await axios.post('http://localhost:8080/createPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log(response.data); // Handle the response as needed
      navigate('/home');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    }
  }

  return (
    <>
      <Navbar />
      
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea
          name="caption"
          placeholder="Write your caption here..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <br /><br />
        <button type="submit">POST</button>
      </form>
    </>
  )
}
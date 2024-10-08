import React, { useState } from 'react';
import axios from 'axios';

export default function EditProfile() {
  const username = sessionStorage.getItem('username');
  console.log(username);
  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    city: '',
    bio: '',
    college: '',
    linkedIn: '',
    gitHub: '',
    profilePic: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePic: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send the profilePic file
    const updateData = new FormData();
    updateData.append('dob', formData.dob);
    updateData.append('gender', formData.gender);
    updateData.append('city', formData.city);
    updateData.append('bio', formData.bio);
    updateData.append('college', formData.college);
    updateData.append('linkedIn', formData.linkedIn);
    updateData.append('gitHub', formData.gitHub);
    updateData.append('profilePic', formData.profilePic);
    updateData.append('username', username);
    try {
      const response = await axios.post('http://localhost:8080/updateProfile', updateData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Profile updated successfully:', response.data);
      // Optionally, redirect to profile page or show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>DOB:</label>
      <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
      <br /><br />

      <label>GENDER:</label>
      <label>M</label>
      <input type="radio" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleInputChange} />
      <label>F</label>
      <input type="radio" name="gender" value="F" checked={formData.gender === 'F'} onChange={handleInputChange} />
      <label>O</label>
      <input type="radio" name="gender" value="O" checked={formData.gender === 'O'} onChange={handleInputChange} />
      <br /><br />

      <label>CITY:</label>
      <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
      <br /><br />

      <label>BIO:</label>
      <input type="text" name="bio" value={formData.bio} onChange={handleInputChange} />
      <br /><br />

      <label>COLLEGE:</label>
      <input type="text" name="college" value={formData.college} onChange={handleInputChange} />
      <br /><br />

      <label>LINKED IN:</label>
      <input type="text" name="linkedIn" value={formData.linkedIn} onChange={handleInputChange} />
      <br /><br />

      <label>GIT HUB:</label>
      <input type="text" name="gitHub" value={formData.gitHub} onChange={handleInputChange} />
      <br /><br />

      <label>Profile Picture:</label>
      <input type="file" name="profilePic" accept="image/*" onChange={handleFileChange} />
      <br /><br />

      <input type="submit" value="Update Profile" />
    </form>
  );
}
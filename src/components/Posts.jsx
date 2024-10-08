import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  const [newComments, setNewComments] = useState({}); 

  useEffect(() => {
    const fetchPosts = async () => { 
        const response = await axios.get('http://localhost:8080/getAllPosts'); 
        setAllPosts(response.data);
        
        console.log('Number of posts:', response.data.length);
    };

    fetchPosts();
  }, []);

  // Handle Like Post
  const handleLike = async (id, index) => {
    try {
      const response = await axios.post('http://localhost:8080/likePost', null, {
        params: { id: id }
      });
      
      // Update the likes count locally in the state
      const updatedPosts = [...allPosts];
      updatedPosts[index].likes = response.data;
      setAllPosts(updatedPosts);
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  // Handle adding a new comment
  const handleCommentSubmit = async (id, index, comment) => {
    
      const response = await axios.post('http://localhost:8080/addComment', null, {
        params: { id: id, comment: comment }
      });
      
      // Update the comments locally in the state
      const updatedPosts = [...allPosts];
      updatedPosts[index] = response.data; // Update the entire post with the returned post
      setAllPosts(updatedPosts);

      // Clear the new comment for the post
      setNewComments(prevState => ({ ...prevState, [id]: '' }));
    
  };

  // Handle new comment input change
  const handleCommentChange = (postId, value) => {
    setNewComments(prevState => ({ ...prevState, [postId]: value }));
  };


  return (
    <div>
      <h3>All Posts</h3>
      {allPosts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        allPosts.map((post, index) => (
          <div key={index}>
            {/* user info */}
             <div className="post-header">
                <div className="profile-pic">
                  <img
                    src={`data:image/jpeg;base64,${post.user.photoBase64}`}
                    alt="User"
                    style={{ maxWidth: '50px', borderRadius: '50%' }}
                  />
                </div>
              
              <span className="username">{post.user?.username || 'Unknown'}</span>
            </div>
            {/* post photo */}
            <img
                src={`data:image/jpeg;base64,${post.photo}`}
                alt="Post"
                style={{ maxWidth: '100%', height: 'auto' }} 
            />
            {/* post caption */}
            <h4>{post.caption}</h4>

            {/* post likes */}
            <p>
              <strong>Likes: </strong>
              {post.likes}
            </p>
            <button onClick={() => handleLike(post.id, index)}>
              Like Post
            </button>

            {/* post comments */}
            {/* Comment Form */}
            <div className="comments-section">
              <h4>Comments:</h4>
              <ul>
                {post.comments && post.comments.map((comment, i) => (
                  <li key={i}>{comment}</li>
                ))}
              </ul>

              {/* New Comment Form */}
              <textarea
                placeholder="Add a comment..."
                value={newComments[post.id] || ''}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
              ></textarea>
              <button onClick={() => handleCommentSubmit(post.id, index, newComments[post.id])}>
                Comment
              </button>
            </div>
          
          </div>
        ))
      )}
    </div>
  );
}
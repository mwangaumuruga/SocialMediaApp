import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [commentContent, setCommentContent] = useState('');

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8082/posts'); // Adjust the URL as per your backend API
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Handle post creation
  const handlePostCreate = async () => {
    try {
      const response = await axios.post('http://localhost:8082/posts', {
        userID: 1, // Replace this with the actual userID (if applicable)
        content: newPostContent,
      });
      console.log(response.data);
      setNewPostContent('');
      fetchPosts(); // Fetch updated posts after creating a new post
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Handle post like
  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:8082/posts/${postId}/like`);
      console.log(response.data);
      fetchPosts(); // Fetch updated posts after liking a post
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Handle adding a comment to a post
  const handleAddComment = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:8082/posts/${postId}/comments`, {
        content: commentContent,
      });
      console.log(response.data);
      setCommentContent('');
      fetchPosts(); // Fetch updated posts after adding a comment
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <div>
        {/* Create new post */}
        <input
          type="text"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handlePostCreate}>Create Post</button>
      </div>
      <div>
        {/* Display posts */}
        {posts.map((post) => (
          <div key={post.id}>
            <p>User ID: {post.userID}</p>
            <p>Content: {post.content}</p>
            {/* You can add additional components for liking and commenting */}
            {/* Like post */}
            <button onClick={() => handleLikePost(post.id)}>Like</button>
            {/* Add comment */}
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button onClick={() => handleAddComment(post.id)}>Add Comment</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

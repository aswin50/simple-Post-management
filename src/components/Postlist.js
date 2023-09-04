import React, { useEffect, useState} from 'react';
import { TextField, Button, Typography} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import PostCard from './Postcard';


const PostList = () => {
  const [posts, setPosts] = useState([]);
 
  const [searchTerm, setSearchTerm] = useState('')

  const [filteredPosts, setFilteredPosts] = useState([]) 
  
  const[deletequeue,setdeletequeue] = useState(0)

  const[deletequeuearr,setdeletequeuearr] = useState([])

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('postManagementState'));
    if (savedState) {
      setSearchTerm(savedState.searchTerm);
      setFilteredPosts(savedState.filteredPosts);
    }
  }, []);
 
  useEffect(() => {
    const stateToSave = {
      searchTerm,
      filteredPosts,
    };
    localStorage.setItem('postManagementState', JSON.stringify(stateToSave));
  }, [searchTerm, filteredPosts]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        //console.log(response.data)
        setPosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPosts(posts);
      return;
    }
if(typeof searchTerm == 'string'){
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(lowercaseSearchTerm) ||
      post.body.toLowerCase().includes(lowercaseSearchTerm)
    );

    setFilteredPosts(filtered);
}
  }, [searchTerm]);

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setdeletequeuearr([...deletequeuearr,postId])
    setdeletequeue(deletequeue+1);
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };
   
  const handleRefreshState = () => {
  localStorage.removeItem('postManagementState')
  for (const postId of deletequeuearr) {
     axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
  setdeletequeuearr([]);
}

useEffect(() => {
  const savedDeleteQueue = JSON.parse(localStorage.getItem('deletequeue'));
  if (savedDeleteQueue) {
    setdeletequeuearr(savedDeleteQueue);
  }
}, []);

   useEffect(()=>{
     localStorage.setItem('deletequeue',JSON.stringify(deletequeuearr));
   },[deletequeuearr])

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"  
        fullWidth
        style={{ width: '500px',marginBottom: '16px',marginTop: '20px'}}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
       <Typography variant="subtitle1" gutterBottom>
        DELETE QUEUE: {deletequeue}
      </Typography>
      <Button variant="contained" onClick={handleRefreshState} style={{marginBottom: '16px',marginTop: '30px',marginLeft: '16px'}}>
        <RefreshIcon />
      </Button>
      {filteredPosts.map((post) => (
        
        <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
      ))} 
      
 </div>
  );
};

export default PostList;

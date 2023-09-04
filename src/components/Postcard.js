import React, { useState } from 'react';
import {
  Card,
  CardContent, 
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import '../styles.css';

const PostCard = ({ post, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
    if (comments.length === 0) {
      setLoading(true);
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((response) => {
          console.log(response.data)
          setLoading(false)
          setComments(response.data);
        })
       
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(post.id);
  };

  return (
    <>
    <Card className='post-card' onClick={handleOpenDialog}  >
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2">{post.body}</Typography>
        <div className='Delete_button'>
        <Button onClick={handleDelete} color="error" variant="outlined" >
          Delete
        </Button>
        </div>
      </CardContent>
      </Card>
      <Dialog open={open}  >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          {loading ? (
            'Loading comments...'
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    
    </>
  );
};

export default PostCard;

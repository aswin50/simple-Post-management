import PostList from "./components/Postlist";
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import './styles.css';
export default function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
       
          <Typography variant="h6">Simple Post Management</Typography>
        
        </Toolbar>
      </AppBar>
      <Container>
        <PostList />
      </Container>
    </div>
  );
}

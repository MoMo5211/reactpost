import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Container, Title, Text, Image, Stack, Button, Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useBoundStore from "../../store/Store.js" 
import { useMediaQuery } from '@mantine/hooks';

function PostDetailsPage() {

  const isWideScreen = useMediaQuery('(min-width: 914px)');

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useBoundStore((state) => state); // Access user from the global state
  const isAuthor = user && post && user.id === post.userId;
  console.log(isAuthor)

  useEffect(() => {
    setPost(null);
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Failed to fetch post details:', error);
      }
    };
    fetchPostDetails();
  }, [id]);

  if (!post) {
    return <Container>Loading...</Container>;
  }

  return (

    <Grid style={{ 
      paddingBottom: '20vh', 
      paddingTop: '20vh', 
      paddingLeft: '10%',
      paddingRight: '10%',
      flexDirection: isWideScreen ? 'row-reverse' : 'row', // Flex direction based on screen width
    }}>
      <Grid.Col span={4} md={4} sm={12} style={{ maxWidth: '40%' }}>
        <Image src={post.image} alt="Post Image" style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
      </Grid.Col>
      <Grid.Col span={8} md={8} sm={12} style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        paddingLeft: '20px', 
        paddingRight: '20px',
        paddingTop: '30px', 
        borderRadius: '20px',
      }}>
        <Stack spacing="md"> 
          <Title order={3}>{post.title}</Title>
          <Text>Author: {post.authorName}</Text>
          <Text>Category: {post.category}</Text>
          <Text>{post.content}</Text>
        </Stack>
        <Button component={Link} to="/posts" style={{ marginTop: '20px', marginRight: '10px' }}>Back to Posts</Button>
        {isAuthor && (
          <Button component={Link} to={`/posts/edit/${post.id}`}>Edit</Button>
        )}
      </Grid.Col>
    </Grid>


  );
}


export const postDetailsLoader = async ({ params }) => {
  if (!params.id) {
    console.error('Post ID is missing');
    return null; 
  }

  try {
    const response = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
    return response.data; // Return the fetched post data
  } catch (error) {
    console.error('Failed to load post details:', error);
    return null; // or appropriate error handling
  }
};
export default PostDetailsPage;

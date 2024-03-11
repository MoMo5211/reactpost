import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextInput, Textarea, Button, Container, Group, LoadingOverlay } from '@mantine/core';
import useBoundStore from "../../store/Store.js"
import DOMAIN from "../../services/endpoint.js";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useBoundStore((state) => state);
  const [post, setPost] = useState({
    title: '',
    category: '',
    content: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      console.log(DOMAIN);
      try {
        const response = await axios.get(`${DOMAIN}/api/posts/${id}`);
        console.log(response.data); 
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${DOMAIN}/api/posts/${id}`, {
        ...post,
        userId: user.id, 
      });
      navigate(`/posts/${id}`); // Redirect to the post details page after successful update
    } catch (error) {
      console.error("Error updating post:", error);
    }

    setLoading(false);
  };

  return (
    <Container style={{ paddingBottom: '20vh', paddingTop: '10vh' }}>
      <LoadingOverlay visible={loading} />
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title" 
          name="title"
          value={post.title}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Category"
          name="category"
          value={post.category}
          onChange={handleInputChange}
          required
          mt="md" 
        />        
        <TextInput
          label="Image URL"
          name="image"
          value={post.image}
          onChange={handleInputChange}
          mt="md" 
        />
        <Textarea
          label="Content"
          name="content"
          value={post.content}
          onChange={handleInputChange}
          required
          mt="md" 
        />

        <Group position="right" mt="xl">
          <Button type="submit">Update Post</Button>
        </Group>
      </form>
    </Container>
  );
};

export default EditPostPage;

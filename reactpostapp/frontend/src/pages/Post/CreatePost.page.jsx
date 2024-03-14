import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

function CreatePostPage() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
    },
  });

  const handleSubmit = async (values) => {
    const token = localStorage.getItem('authToken');
    console.log('Retrieved token:', token);
    
    if (!token) {
      console.error("No auth token found. Please log in first.");
      return;
    }
  
    try {
      const res = await axios.post(`${DOMAIN}/api/posts`, values, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
      });
  
      if (res.status === 201 || res.data.success) {
        navigate("/posts");
      }
    } catch (error) {
      console.error("Error creating post:", error.response.data);
      // Handle error
    }
  };
  
  return (
    <Box maw={300} mx="auto" style={{ paddingBottom: '20vh', paddingTop: '20vh'}}>
      <form onSubmit={form.onSubmit(handleSubmit)} >
        <TextInput 
          label={<span style={{ fontWeight: 'bold' }}>Title</span>}
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label={<span style={{ fontWeight: 'bold' }}>Category</span>}
          placeholder="Enter a Category"
          mt="md" 
          {...form.getInputProps("category")}
        />
        <TextInput
          label={<span style={{ fontWeight: 'bold' }}>Image</span>}
          placeholder="Enter an Image"
          mt="md" 
          {...form.getInputProps("image")}
        />

        <TextInput
           label={<span style={{ fontWeight: 'bold' }}>Content</span>}
          placeholder="Enter some content"
          mt="md" 
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default CreatePostPage;

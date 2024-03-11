
import React, { useState, useEffect } from 'react';
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { Loader } from '@mantine/core';
import useLoadingStore from '../../store/useLoadingStore.js';

export const PostPage = () => {
  const { isLoading, setLoading } = useLoadingStore();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${DOMAIN}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [setLoading]);

  if (isLoading) {
    return   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
    <Loader size="xl" variant="dots" />
  </div>

  }

  return (
    <Container style={{ paddingTop: '30vh', paddingBottom: '30vh' }}>
      <SimpleGrid cols={4}>
        {posts?.map((post) => (
          <ArticleCardImage key={post.title} {...post} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("I ran!");
  return res.data;
};

import { Container } from "@mantine/core";
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <Container className={styles.container}>
      <h1>Find your inspiration.</h1>
      <p>SnapInn is a platform where photographers, both amateurs and professionals, can upload, share, and discuss their photographs. With SnapInn, capture the essence of moments and share them with a community that appreciates the art of photography.</p>
    </Container>
  );
};

export default Landing;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, user } = useBoundStore((state) => state);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, [user, navigate]);

  const onLogin = async (event) => {
    event.preventDefault(); 
    if (!email || !password) return;
    loginService(email, password);
  };

  return (
    <div className={classes.container} >
      <Container size={420} my={40} style={{ paddingBottom: '9vh'}}>
        <Title align="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" onClick={() => navigate('/register')}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" component="form" onSubmit={onLogin}>
          <TextInput 
            label="Email" 
            placeholder="you@mantine.dev" 
            required 
            value={email} 
            onChange={(event) => setEmail(event.currentTarget.value)} 
          />
          <PasswordInput 
            label="Password" 
            placeholder="Your password" 
            required 
            mt="md" 
            value={password} 
            onChange={(event) => setPassword(event.currentTarget.value)} 
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;

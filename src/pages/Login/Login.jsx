import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Link,
  Container,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Senha:', senha);

    try {
      const response = await fetch('http://127.0.0.1:3333/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Salva token e ID do usuário no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario_id', data.userId);

        setMessage('Login bem-sucedido!');
        console.log('Token recebido:', data.token);
        console.log('Usuário ID:', data.userId);

        // ✅ Redireciona após salvar os dados
        navigate('/Step1');
      } else {
        setMessage(data.error || 'Erro ao fazer login');
        console.error('Erro na resposta do servidor:', data);
      }
    } catch (error) {
      setMessage('Erro na conexão com o servidor');
      console.error('Erro:', error);
    }
  };

  return (
    <Box bg="#072AC8" minH="100vh" py={10} display="flex" justifyContent="center" alignItems="center">
      <Container maxW="lg">
        <Box bg="whiteAlpha.300" p={8} borderRadius="20" boxShadow="lg" backdropFilter="blur(10px)">
          <VStack spacing={8}>
            <Heading color="white" mb={6} textAlign="center" fontSize="28">
              Acesse o sistema
            </Heading>

            <InputGroup>
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="whiteAlpha.100"
                color="white"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                _placeholder={{ color: 'whiteAlpha.700' }}
                py={6}
                px={4}
                w="100%"
              />
            </InputGroup>

            <InputGroup>
              <Input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                bg="whiteAlpha.100"
                color="white"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                _placeholder={{ color: 'whiteAlpha.700' }}
                py={6}
                px={4}
                w="100%"
              />
              <InputRightElement h="full" pr={4}>
                <IconButton
                  icon={mostrarSenha ? <ViewOffIcon /> : <ViewIcon />}
                  variant="ghost"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                />
              </InputRightElement>
            </InputGroup>

            <Button
              w="100%"
              bg="white"
              color="blue.600"
              _hover={{ bg: 'whiteAlpha.900' }}
              onClick={handleSubmit}
              borderRadius="40px"
            >
              Login
            </Button>

            {message && <Text color="white" mt={4} textAlign="center">{message}</Text>}

            <Text color="white" mt={4} textAlign="center">
              Não tem uma conta?{' '}
              <Link href="#" color="white" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                Cadastre-se
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;

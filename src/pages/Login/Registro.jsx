import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Input, FormControl, FormLabel, Text, VStack, useToast, Container } from "@chakra-ui/react";

const Registro = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [numeroTelefone, setNumeroTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nomeCompleto, numeroTelefone, email, senha })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Cadastro bem-sucedido!");
        toast({ title: "Cadastro realizado!", status: "success", duration: 3000 });
        console.log("Usuário registrado com ID:", data.id);
      } else {
        setMessage("Erro ao registrar o usuário");
        toast({ title: "Erro ao registrar", status: "error", duration: 3000 });
        console.error("Erro na resposta do servidor");
      }
    } catch (error) {
      setMessage("Erro na conexão com o servidor");
      toast({ title: "Erro de conexão", status: "error", duration: 3000 });
      console.error("Erro:", error);
    }
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;

    if (/^\d*$/.test(phone)) {
      setNumeroTelefone(phone);
    }
  };

  return (
    <Box bg="#072AC8" minHeight="100vh" py={10} display="flex" justifyContent="center" alignItems="center">
      <Container maxW="lg"> {/* Aumentei a largura do container */}
        <Box
          bg="whiteAlpha.300"
          p={8}
          borderRadius="20"
          boxShadow="lg"
          backdropFilter="blur(10px)"
        >
          <VStack spacing={8}> {/* Aumentei o spacing entre os campos */}
            <Text fontSize="2xl" color="white" textAlign="center" mb="6">
              Crie sua conta
            </Text>

            <FormControl isRequired>
              <Input
                id="nomeCompleto"
                type="text"
                placeholder="Nome Completo"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                bg="whiteAlpha.100"
                color="white"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                _placeholder={{ color: 'whiteAlpha.900' }}
                py={6}
                px={4}
                w="100%"  // Ajustei para 100% da largura
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                id="numeroTelefone"
                type="tel"
                placeholder="Número de Telefone"
                value={numeroTelefone}
                onChange={handlePhoneChange}
                bg="whiteAlpha.100"
                color="white"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                _placeholder={{ color: 'whiteAlpha.900' }}
                py={6}
                px={4}
                w="100%"  // Ajustei para 100% da largura
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="whiteAlpha.100"
                color="white"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                _placeholder={{ color: 'whiteAlpha.900' }}
                py={6}
                px={4}
                w="100%"  // Ajustei para 100% da largura
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                id="senha"
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                bg="whiteAlpha.100"
                color="white"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                _placeholder={{ color: 'whiteAlpha.900' }}
                py={6}
                px={4}
                w="100%"  // Ajustei para 100% da largura
              />
            </FormControl>

            <Button
              w="100%"  // Alinhei o botão para ocupar a largura total
              bg="white"  // Fundo branco
              color="black"  // Texto preto
              _hover={{ bg: 'gray.100' }}  // Efeito de hover com fundo cinza claro
              onClick={handleSubmit}
              borderRadius="40px"
            >
              Registrar
            </Button>

            {message && <Text color="white" mt="4" textAlign="center">{message}</Text>}

            <Text mt="4" fontSize="sm" color="white" textAlign="center">
              Já tem uma conta?{" "}
              <Link
                href="/"
                color="white"
                fontWeight="bold"
                _hover={{ textDecoration: 'underline', color: 'gray.300' }} // Efeito underline e mudança de cor no hover
              >
                Faça login
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Registro;

import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Container,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Heading,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"; // Importando useNavigate

const LoginAdm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate(); // Instanciando o hook para navegação

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Tentando login com:", { username, password });

    try {
      const response = await fetch("http://127.0.0.1:3333/loginAdm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login bem-sucedido!");
        console.log("Token recebido:", data.token);

        // Redirecionando para a página Lista após o login
        navigate("/Lista");
      } else {
        setMessage(data.error || "Erro ao fazer login");
        console.error("Erro na resposta do servidor:", data);
      }
    } catch (error) {
      setMessage("Erro na conexão com o servidor");
      console.error("Erro:", error);
    }
  };

  return (
    <Box bg="#072AC8" minH="100vh" py={10} display="flex" justifyContent="center" alignItems="center">
      <Container maxW="lg">
        <Box bg="whiteAlpha.300" p={8} borderRadius="20" boxShadow="lg" backdropFilter="blur(10px)">
          <VStack spacing={8}>
            <Heading color="white" mb={6} textAlign="center" fontSize="28">
              Acesse o sistema de Administrador
            </Heading>

            <FormControl>
              <FormLabel color="white">E-mail</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <FaUser color="white" />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  bg="whiteAlpha.100"
                  color="white"
                  border="2px solid rgba(255, 255, 255, 0.2)"
                  borderRadius="40px"
                  _placeholder={{ color: "whiteAlpha.700" }}
                  py={6}
                  px={4}
                  w="100%"
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel color="white">Senha</FormLabel>
              <InputGroup>
                <Input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="whiteAlpha.100"
                  color="white"
                  border="2px solid rgba(255, 255, 255, 0.2)"
                  borderRadius="40px"
                  _placeholder={{ color: "whiteAlpha.700" }}
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
                    _hover={{ bg: "whiteAlpha.200" }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button w="100%" bg="white" color="blue.600" _hover={{ bg: "whiteAlpha.900" }} onClick={handleSubmit} borderRadius="40px">
              Login
            </Button>

            {message && <Text color="white" textAlign="center" mt={4}>{message}</Text>}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginAdm;

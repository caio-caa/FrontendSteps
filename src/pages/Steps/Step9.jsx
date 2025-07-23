import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Center,
  FormControl,
  Divider,
  Input,
  FormLabel,
  HStack,
  Button,
  Select,
  Text,
  Checkbox,
  CheckboxGroup,
  VStack,
  Textarea,
  RadioGroup,
  Radio,
  ChakraProvider,
  Stack,
  Tooltip,
  Circle,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { FaWhatsapp, FaLinkedin, FaInstagramSquare } from 'react-icons/fa';
import axios from 'axios';
import Template from '../../Template';
import { useNavigate } from 'react-router-dom';



function App() {
  const [nome, setNome] = useState('');
  const [step, setStep] = useState(9);
  const [status, setStatus] = useState('Enviado');
  const [error, setError] = useState(null);
  const usuarioId = localStorage.getItem('usuario_id') || 1; // Recupera o ID do usuário como no Step5
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const handleVerMais = (usuarioId) => {
    setSelectedId(Number(usuarioId));
  };

  const handleBack = () => {
    setSelectedId(null);
  };

  useEffect(() => {
    console.log('ID do usuário recuperado:', usuarioId);
  }, [usuarioId]);

  // Função para atualizar o status
  const atualizarStatus = async (novoStatus) => {
    try {
      const response = await axios.put(`http://127.0.0.1:3333/status/${usuarioId}`, {
        status: novoStatus
      });

      if (response.status === 200) {
        setStatus(novoStatus);
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  // Efeito para buscar e inicializar o status
  useEffect(() => {
    const buscarStatus = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3333/status/${usuarioId}`);
        if (response.data && response.data.status) {
          setStatus(response.data.status);
          console.log('Status atual do formulário:', response.data.status);
        }
      } catch (error) {
        console.error('Erro ao buscar status:', error);
        // Em caso de erro, mantém o status padrão como 'Enviado'
        setStatus('Enviado');
      }
    };

    buscarStatus();
  }, [usuarioId]);
  if (selectedId) {

    return <Template id={selectedId} onBack={handleBack} />;
    console.log('ID do usuário sendo essssssssssssssssssssnviado:', selectedId);
  }
  return (
    <Box height="10vh">
      <Center
        as="header"
        height={176}
        bg="teal.500"
        color="white"
        backgroundColor={'#072AC8'}
        fontWeight="bold"
        fontSize="4xl"
        paddingBottom="8"
        flexDirection="column"
      >
        Bem-vindo{nome && ','} {nome}, ao Investor Report
        <Text fontSize="2xl" fontWeight="normal" mt={2}>
          {step === 1 ? 'Agora você está preenchendo os dados iniciais de sua Startup' :
            step === 2 ? 'Nessa etapa você vai adicionar os dados do negócio!' :
              step === 3 ? 'Nessa etapa você vai adicionar o perfil do cliente!' :
                step === 4 ? 'Estamos quase lá!' :
                  step === 5 ? 'Nessa etapa você vai adicionar as tecnologias que são utilizadas!' :
                    step === 6 ? 'Agora você vai colocar os dados do mercado!' :
                      step === 7 ? 'Agora são os dados financeiros da Startup!' :
                        step === 8 ? 'Ao completar os campos sobre os dados financeiros da Startup você chega ao fim!' :
                          step === 9 ? 'Muito obrigado por preencher o formulário!' : ''}
        </Text>
      </Center>

      <Flex align="center" justify="center" bg="blackAlpha.200" height="calc(100vh - 150px)">
        <Center
          width="100%"
          maxWidth={840}
          bg="white"
          top={120}
          position="absolute"
          borderRadius={5}
          padding="6"
          boxShadow="0 1px 2px #ccc"
        >




          {step === 9 && (
            <Box position="relative" minHeight="20vh" bg="#fff">
              <Center flexDirection="column" textAlign="center" bg="#fff" p={4} borderRadius={8} boxShadow="md">
                <CheckIcon color="#072AC8" boxSize={12} />
                <Text fontSize="2xl" fontWeight="bold" color="#072AC8" mt={4}>
                  Muito obrigado por preencher o formulário!
                </Text>
                <Text fontSize="lg" mt={4}>
                  Seu formulário foi enviado com sucesso. Nossa equipe entrará em contato em breve.
                </Text>

                {/* Status Tracker */}
                <Box mt={8} width="100%" maxWidth="600px">
                  <Flex justifyContent="space-between" alignItems="center">
                    {['Enviado', 'Em análise', 'Concluído'].map((statusName, index) => (
                      <React.Fragment key={statusName}>
                        {index !== 0 && (
                          <Box
                            flex="1"
                            height="2px"
                            bg={status === statusName ||
                              ['Enviado', 'Em análise', 'Concluído']
                                .indexOf(status) > ['Enviado', 'Em análise', 'Concluído']
                                  .indexOf(statusName)
                              ? "#072AC8"
                              : "gray.300"}
                            mx={2}
                          />
                        )}
                        <Flex direction="column" alignItems="center">
                          <Circle
                            size="40px"
                            bg={status === statusName ? "#072AC8" : "gray.300"}
                            color="white"
                          >
                            {status === statusName ||
                              ['Enviado', 'Em análise', 'Concluído']
                                .indexOf(status) > ['Enviado', 'Em análise', 'Concluído']
                                  .indexOf(statusName)
                              ? <CheckIcon color="white" />
                              : <Text color="white" fontSize="sm">{index + 1}</Text>}
                          </Circle>
                          <Text
                            mt={2}
                            fontSize="sm"
                            fontWeight="bold"
                            color={status === statusName ? "#072AC8" : "gray.300"}
                          >
                            {statusName}
                          </Text>
                        </Flex>
                      </React.Fragment>
                    ))}
                  </Flex>
                </Box>

                {/* Botões */}
                <Flex mt={8} justifyContent="center" flexWrap="wrap" gap={6} p={4}>
                  <Button
                    as="a"
                    href="https://wa.me/5511935025094?text=Olá,%20sou%20Startup%20e%20gostaria%20de%20tirar%20algumas%20dúvidas!"
                    target="_blank"
                    rel="noopener noreferrer"
                    bg="green.500"
                    color="white"
                    _hover={{ bg: 'green.600' }}
                    leftIcon={<FaWhatsapp />}
                    size="lg"
                  >
                    Conversar com um consultor
                  </Button>

                  <Button
                    bgGradient="linear(to-r, #072AC8, #1E90FF)"
                    color="white"
                    _hover={{
                      bgGradient: 'linear(to-r, #1E90FF, #072AC8)',
                      transform: 'scale(1.05)',
                    }}
                    size="lg"
                    onClick={() => {
                      if (window.confirm("Tem certeza de que deseja reiniciar o formulário?")) {
                        window.location.href = 'http://localhost:5173/Perguntas';
                      }
                    }}
                  >
                    Pivotei (Reiniciar Formulário)
                  </Button>

                  {/* Investor Report e One Page lado a lado */}
                  <Flex direction="row">
                    <Button
                      onClick={() => navigate('/report')}
                      bgGradient="linear(to-r, #072AC8, #1E90FF)"
                      color="white"
                      _hover={{
                        bgGradient: 'linear(to-r, #1E90FF, #072AC8)',
                        transform: 'scale(1.05)',
                      }}
                      size="lg"
                      px={12}
                      py={6}
                    >
                      Responder Investor Report
                    </Button>

                    <Button
                      bgGradient="linear(to-r, #072AC8, #1E90FF)"
                      color="white"
                      _hover={{
                        bgGradient: 'linear(to-r, #1E90FF, #072AC8)',
                        transform: 'scale(1.05)',
                      }}
                      size="lg"
                      px={20}
                      py={6}
                      ml={7}
                      onClick={() => {
                        console.log('Clicou em Ler Mais', usuarioId);
                        handleVerMais(usuarioId);
                      }}
                    >
                      Gerar One Page
                    </Button>
                  </Flex>
                </Flex>



                <p>Última resposta: </p>

                {/* Links para Instagram e LinkedIn */}
                <Flex justifyContent="center" mt={4} gap={6}>
                  {[
                    { href: "https://www.instagram.com/loor.vc/", icon: <FaInstagramSquare color="#E4405F" size={20} />, text: "loor.vc", color: "#E4405F" },
                    { href: "https://www.linkedin.com/company/loor-venture-capital/", icon: <FaLinkedin color="#0077B5" size={20} />, text: "loor.vc", color: "#0077B5" }
                  ].map(({ href, icon, text, color }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                      <Flex alignItems="center">
                        {icon}
                        <Text ml={2} fontWeight="bold" color={color}>{text}</Text>
                      </Flex>
                    </a>
                  ))}
                </Flex>
              </Center>
            </Box>
          )}



        </Center>
      </Flex>
    </Box>
  );
}

export default App;
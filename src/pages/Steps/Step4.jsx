import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Step4() {
  const [estrategiaAquisicao, setEstrategiaAquisicao] = useState('');
  const [baseClientes, setBaseClientes] = useState('');
  const [planoCrescimento, setPlanoCrescimento] = useState('');
  const [maiorDesafio, setMaiorDesafio] = useState('');
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem('usuario_id') || 1; // Recupera o ID do usuário

  useEffect(() => {
    const currentStep = localStorage.getItem('user_' + usuarioId + '_lastStep');
    if (currentStep && Number(currentStep) > 4) {
      navigate(`/Step${currentStep}`);
    }

    // Preencher os campos com os dados do localStorage se existirem
    const step4Data = JSON.parse(localStorage.getItem('step4Data')) || {};
    setEstrategiaAquisicao(step4Data.estrategia_aquisicao || '');
    setBaseClientes(step4Data.base_clientes || '');
    setPlanoCrescimento(step4Data.plano_crescimento || '');
    setMaiorDesafio(step4Data.maior_desafio || '');
  }, [usuarioId, navigate]);

  const nextStep = async () => {
    try {
      const token = localStorage.getItem('token'); // Recupera o token JWT
      const data = {
        usuario_id: usuarioId,
        estrategia_aquisicao: estrategiaAquisicao,
        base_clientes: baseClientes,
        plano_crescimento: planoCrescimento,
        maior_desafio: maiorDesafio,
      };

      console.log('Enviando dados:', data);
      
      // Salva os dados no localStorage
      localStorage.setItem('step4Data', JSON.stringify(data));

      const response = await axios.post('http://127.0.0.1:3333/steps/step4', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data);
      localStorage.setItem('user_' + usuarioId + '_lastStep', 5);
      navigate('/Step5');
    } catch (error) {
      console.error('Erro ao salvar Step 4:', error.response ? error.response.data : error);
      alert('Erro ao salvar os dados. Verifique sua conexão e tente novamente.');
    }
  };

  const prevStep = () => {
    localStorage.setItem('user_' + usuarioId + '_lastStep', 3);
    navigate('/Step3');
  };

  return (
    <Box height="10vh">
      <Center
        as="header"
        height={176}
        bg="#072AC8"
        color="white"
        fontWeight="bold"
        fontSize="4xl"
        paddingBottom="8"
        flexDirection="column"
      >
        Investor Report
        <Text fontSize="2xl" fontWeight="normal" mt={2}>
          Estamos quase lá! Complete as informações sobre crescimento e desafios.
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
          <FormControl display="flex" flexDirection="column" gap="4">
            <Box width="100%">
              <FormLabel>Qual sua estratégia de aquisição de clientes?</FormLabel>
              <Textarea
                placeholder="Descreva sua estratégia de aquisição de clientes"
                value={estrategiaAquisicao}
                onChange={(e) => setEstrategiaAquisicao(e.target.value)}
              />
            </Box>

            <Box width="100%">
              <FormLabel>Qual o tamanho da sua base de clientes?</FormLabel>
              <Select
                placeholder="Selecione uma opção"
                value={baseClientes}
                onChange={(e) => setBaseClientes(e.target.value)}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i * 10 + 1} à ${(i + 1) * 10}`}>
                    {`${i * 10 + 1} à ${(i + 1) * 10}`}
                  </option>
                ))}
                <option value="+100">+100</option>
              </Select>
            </Box>

            <Box width="100%">
              <FormLabel>Como está estruturado seu plano de crescimento?</FormLabel>
              <Textarea
                placeholder="Descreva seu plano de crescimento"
                value={planoCrescimento}
                onChange={(e) => setPlanoCrescimento(e.target.value)}
              />
            </Box>

            <Box width="100%">
              <FormLabel>Qual seu maior desafio e como pretende resolvê-lo?</FormLabel>
              <Textarea
                placeholder="Descreva seu maior desafio e como pretende resolvê-lo"
                value={maiorDesafio}
                onChange={(e) => setMaiorDesafio(e.target.value)}
              />
            </Box>

            <HStack spacing="4">
              <Button
                marginTop={4}
                colorScheme="blue"
                onClick={prevStep}
              >
                Anterior
              </Button>
              <Button
                marginTop={4}
                colorScheme="blue"
                onClick={nextStep}
              >
                Próximo
              </Button>
            </HStack>
          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default Step4;

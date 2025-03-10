import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Text,
  Textarea,
  Stack,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Step5() {
  const [tecnologias, setTecnologias] = useState('');
  const [impactoTecnologias, setImpactoTecnologias] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const usuarioId = localStorage.getItem('usuario_id') || 1; // Recupera o ID do usuário

  useEffect(() => {
    const currentStep = localStorage.getItem('currentStep');
    if (currentStep && Number(currentStep) > 5) {
      navigate(`/Step${currentStep}`);
    }
    focusLastField();
  }, [navigate]);

  const handleFocus = (event) => {
    const id = event.target.id;
    if (id) {
      localStorage.setItem('lastFocusedField', id);
    }
  };

  const focusLastField = () => {
    const lastFocusedField = localStorage.getItem('lastFocusedField');
    if (lastFocusedField) {
      const field = document.getElementById(lastFocusedField);
      if (field) {
        field.focus();
      }
    }
  };

  const handleImpactoTecnologiasChange = (index, value) => {
    setImpactoTecnologias((prev) => {
      const novoImpacto = [...prev];
      novoImpacto[index] = Number(value);
      return novoImpacto;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Recupera o token JWT
      const data = {
        usuario_id: usuarioId,
        tecnologias,
        impacto_gateway_pagamento: impactoTecnologias[0],
        impacto_realidade_aumentada: impactoTecnologias[1],
        impacto_analise_dados: impactoTecnologias[2],
        impacto_ia: impactoTecnologias[3],
        impacto_blockchain: impactoTecnologias[4],
        impacto_cripto: impactoTecnologias[5],
        impacto_tokenizacao: impactoTecnologias[6],
      };

      console.log('Enviando dados:', data);

      const response = await axios.post('http://127.0.0.1:3333/steps/step5', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Step 5 salvo com sucesso:', response.data);
      localStorage.setItem('currentStep', 6);
      navigate('/Step6');
    } catch (error) {
      console.error('Erro ao salvar Step 5:', error.response?.data || error.message);
      alert('Erro ao enviar os dados. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => {
    navigate('/Step4');
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
          Nessa etapa você vai adicionar as tecnologias que são utilizadas!
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
              <FormLabel>Liste as 5 principais tecnologias desenvolvidas e utilizadas em seu modelo de negócios.</FormLabel>
              <Textarea
                id="tecnologias"
                placeholder="Exemplo: Inteligência Artificial, Blockchain, Machine Learning..."
                value={tecnologias}
                onChange={(e) => setTecnologias(e.target.value)}
                onFocus={handleFocus}
              />
            </Box>

            <Box width="100%">
              <FormLabel>
                Selecione tecnologias que apresentam sinergia com sua startup e defina o nível de impacto para o seu negócio hoje.
              </FormLabel>
            </Box>

            <Stack spacing={4} p={4}>
              {["Gateway de pagamento", "Realidade Aumentada", "Análise de dados", "IA", "Blockchain", "Cripto", "Tokenização"].map(
                (item, index) => (
                  <Stack key={index} direction="row" align="center">
                    <Text flex="1" textAlign="left">
                      {item}
                    </Text>
                    <RadioGroup
                      value={impactoTecnologias[index]?.toString() || "0"}
                      onChange={(value) => handleImpactoTecnologiasChange(index, value)}
                    >
                      <Stack direction="row" spacing={4}>
                        {[0, 1, 2, 3, 4, 5].map((value) => (
                          <Radio key={value} value={value.toString()}>
                            {value}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Stack>
                )
              )}
            </Stack>

            <HStack spacing="4" marginTop={4}>
              <Button
                onClick={prevStep}
                bg="blue"
                color="white"
                _hover={{ bg: "white", color: "blue", border: "2px solid blue" }}
              >
                Anterior
              </Button>
              <Button
                onClick={handleSubmit}
                bg="blue"
                color="white"
                isLoading={loading}
                _hover={{ bg: "white", color: "blue", border: "2px solid blue" }}
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

export default Step5;

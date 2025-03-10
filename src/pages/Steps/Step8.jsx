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

function Step8() {
  const [valuation, setValuation] = useState('');
  const [capTableSocios, setCapTableSocios] = useState('');
  const [estrategiaSaida, setEstrategiaSaida] = useState('');
  const [alocacaoRecursos, setAlocacaoRecursos] = useState('');
  const [pitchLink, setPitchLink] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const usuarioId = localStorage.getItem('usuario_id') || 1;


  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const currentStep = localStorage.getItem('currentStep');
    if (currentStep && Number(currentStep) > 8) {
      navigate(`/Step${currentStep}`);
    }
    focusLastField();
  }, []);

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

  const submitStep8Data = async () => {
    setLoading(true);
    try {
      const token = getToken(); // Obtém o token salvo no localStorage

      const data = {
        usuario_id: usuarioId,
        valuation,
        cap_table_socios: capTableSocios,
        estrategia_saida: estrategiaSaida,
        alocacao_recursos: alocacaoRecursos,
        pitch_link: pitchLink,
      };

      console.log('Enviando os dados do Step 8:', data);

      // Envia os dados para o backend
      const response = await axios.post('http://127.0.0.1:3333/formulario/step8', data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log('Dados enviados com sucesso:', response.data);
      localStorage.setItem('currentStep', 9); // Atualiza o step no localStorage
      navigate('/Step9'); // Avança para o próximo passo
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao enviar os dados. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => {
    navigate('/Step7');
  };

  return (
    <Box height="10vh">
      <Center as="header" height={176} bg="teal.500" color="white" backgroundColor={'#072AC8'} fontWeight="bold" fontSize="4xl" paddingBottom="8" flexDirection="column">
        Bem-vindo, Usuário, ao Investor Report
        <Text fontSize="2xl" fontWeight="normal" mt={2}>
          Ao completar os campos sobre os dados financeiros da Startup você chega ao fim!
        </Text>
      </Center>

      <Flex align="center" justify="center" bg="blackAlpha.200" height="calc(100vh - 150px)">
        <Center width="100%" maxWidth={840} bg="white" top={120} position="absolute" borderRadius={5} padding="6" boxShadow="0 1px 2px #ccc">
          <FormControl display="flex" flexDirection="column" gap="4">
            <HStack spacing="4">
              <Box width="50%">
                <FormLabel>Qual seu valuation?</FormLabel>
                <Select id="valuation" placeholder="Selecione uma opção" value={valuation} onChange={(e) => setValuation(e.target.value)} onFocus={handleFocus}>
                  <option value="1-4">R$ 1MM a R$ 4MM</option>
                  <option value="5-9">R$ 5MM a R$ 9MM</option>
                  <option value="10-11">R$ 10MM a R$ 11MM</option>
                  <option value="12-13">R$ 12MM a R$ 13MM</option>
                  <option value="14-15">R$ 14MM a R$ 15MM</option>
                  <option value="16-17">R$ 16MM a R$ 17MM</option>
                  <option value="18-19">R$ 18MM a R$ 19MM</option>
                  <option value="20">Mais de R$ 20MM</option>
                </Select>
              </Box>
              <Box width="50%">
                <FormLabel>Qual o percentual de cap table dos sócios/founders?</FormLabel>
                <Select id="capTableSocios" placeholder="Selecione uma opção" value={capTableSocios} onChange={(e) => setCapTableSocios(e.target.value)} onFocus={handleFocus}>
                  {[...Array(11).keys()].map((i) => (
                    <option key={i} value={`${i * 10}-${i * 10 + 9}`}>{`${i * 10}% a ${i * 10 + 9}%`}</option>
                  ))}
                </Select>
              </Box>
            </HStack>
            <HStack spacing="4">
              <Box width="50%">
                <FormLabel>Existe uma estratégia de saída da Startup? Qual?</FormLabel>
                <Textarea id="estrategiaSaida" placeholder="Texto de resposta longa" value={estrategiaSaida} onChange={(e) => setEstrategiaSaida(e.target.value)} onFocus={handleFocus} />
              </Box>
              <Box width="50%">
                <FormLabel>Como serão alocados os recursos recebidos?</FormLabel>
                <Textarea id="alocacaoRecursos" placeholder="Texto de resposta longa" value={alocacaoRecursos} onChange={(e) => setAlocacaoRecursos(e.target.value)} onFocus={handleFocus} />
              </Box>
            </HStack>
            <Box width="100%">
              <FormLabel>Tem um pitch gravado ou PDF de apresentação? Informe o link aqui</FormLabel>
              <Textarea id="pitchLink" placeholder="Texto de resposta longa" value={pitchLink} onChange={(e) => setPitchLink(e.target.value)} onFocus={handleFocus} />
            </Box>
            <HStack spacing="4">
              <Button marginTop={4} onClick={prevStep} bg="blue" color="white" _hover={{ bg: "white", color: "blue", border: "2px solid blue" }}>Anterior</Button>
              <Button marginTop={4} onClick={submitStep8Data} isLoading={loading} bg="blue" color="white" _hover={{ bg: "white", color: "blue", border: "2px solid blue" }}>Finalizar e enviar!</Button>
            </HStack>
          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default Step8;

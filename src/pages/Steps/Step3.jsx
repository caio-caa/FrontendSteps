import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  HStack,
  Button,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Step3() {
  const navigate = useNavigate();
  const [clienteIdeal, setClienteIdeal] = useState('');
  const [propostaValor, setPropostaValor] = useState('');
  const [maturidade, setMaturidade] = useState('');
  const [qtdColaboradores, setQtdColaboradores] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    // Verifica se o usuário está autenticado com um ID válido
    const storedUsuarioId = localStorage.getItem('usuario_id');
    if (!storedUsuarioId) {
      navigate('/login'); // Redireciona para o login se não houver usuário autenticado
    } else {
      setUsuarioId(storedUsuarioId); // Define o ID do usuário
    }

    // Verifica o último passo salvo
    const currentStep = localStorage.getItem('user_' + storedUsuarioId + '_lastStep');
    if (currentStep && Number(currentStep) > 3) {
      navigate(`/Step${currentStep}`);
    }
    focusLastField();
  }, [navigate]);

  // 🔹 Função para armazenar o último campo que foi focado
  const handleFocus = (event) => {
    const id = event.target.id;
    if (id) {
      localStorage.setItem('lastFocusedField', id);
    }
  };

  // 🔹 Foca o último campo que foi acessado
  const focusLastField = () => {
    const lastFocusedField = localStorage.getItem('lastFocusedField');
    if (lastFocusedField) {
      const field = document.getElementById(lastFocusedField);
      if (field) {
        field.focus();
      }
    }
  };

  // 🔹 Função para obter o token do localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // 🔹 Função para salvar os dados e ir para o próximo step
  const nextStep = async () => {
    try {
      const token = getToken();
      const data = {
        usuario_id: usuarioId,
        cliente_ideal: clienteIdeal,
        proposta_valor: propostaValor,
        maturidade,
        qtd_colaboradores: qtdColaboradores,
      };
      
      // Envia os dados para o backend
      await axios.post('http://127.0.0.1:3333/step3', data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      
      // Atualiza o último passo no localStorage
      localStorage.setItem('user_' + usuarioId + '_lastStep', 4);
      navigate('/Step4');
    } catch (error) {
      console.error('Erro ao salvar Step 3:', error.response ? error.response.data : error);
      alert('Erro ao salvar os dados. Tente novamente.');
    }
  };

  // 🔹 Função para voltar para o Step2
  const prevStep = () => {
    localStorage.setItem('user_' + usuarioId + '_lastStep', 2);
    navigate('/Step2');
  };

  if (!usuarioId) {
    return <div>Carregando...</div>;
  }

  return (
    <Box height="10vh">
      <Center as="header" height={176} bg="#072AC8" color="white" fontWeight="bold" fontSize="4xl" paddingBottom="8" flexDirection="column">
        Investor Report
        <Text fontSize="2xl" fontWeight="normal" mt={2}>Nessa etapa você vai adicionar o perfil do cliente!</Text>
      </Center>

      <Flex align="center" justify="center" bg="blackAlpha.200" height="calc(100vh - 150px)">
        <Center width="100%" maxWidth={840} bg="white" top={120} position="absolute" borderRadius={5} padding="6" boxShadow="0 1px 2px #ccc">
          <FormControl display="flex" flexDirection="column" gap="4">
            <Box width="100%">
              <FormLabel>Quem é seu cliente ideal?</FormLabel>
              <Textarea
                id="clienteIdeal"
                placeholder="Descreva seu cliente ideal"
                value={clienteIdeal}
                onChange={(e) => setClienteIdeal(e.target.value)}
                onFocus={handleFocus}
              />
            </Box>

            <Box width="100%">
              <FormLabel>Qual sua proposta de valor?</FormLabel>
              <Textarea
                id="propostaValor"
                placeholder="Descreva sua proposta de valor"
                value={propostaValor}
                onChange={(e) => setPropostaValor(e.target.value)}
                onFocus={handleFocus}
              />
            </Box>

            <Box width="100%">
              <FormLabel>Qual o nível de maturidade da sua Startup?</FormLabel>
              <Select
                id="maturidade"
                placeholder="Selecione uma opção"
                value={maturidade}
                onChange={(e) => setMaturidade(e.target.value)}
                onFocus={handleFocus}
              >
                <option value="Ideação">Ideação</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Validação">Validação</option>
                <option value="Operação">Operação</option>
                <option value="Tração">Tração</option>
                <option value="Scale-up">Scale-up</option>
              </Select>
            </Box>

            <Box width="100%">
              <FormLabel>Qual a quantidade de colaboradores por operação?</FormLabel>
              <Select
                id="qtdColaboradores"
                placeholder="Selecione uma opção"
                value={qtdColaboradores}
                onChange={(e) => setQtdColaboradores(e.target.value)}
                onFocus={handleFocus}
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </Select>
            </Box>

            <HStack spacing="4">
              <Button marginTop={4} colorScheme="blue" onClick={prevStep}>
                Anterior
              </Button>
              <Button marginTop={4} colorScheme="blue" onClick={nextStep}>
                Próximo
              </Button>
            </HStack>
          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default Step3;

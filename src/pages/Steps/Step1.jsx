import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Center, FormControl, Input, FormLabel, HStack, Button, Select, Text, Flex } from '@chakra-ui/react';
import axios from 'axios';

function Step1() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState('');
  const [site, setSite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [anoFundacao, setAnoFundacao] = useState('');
  const [cidade, setCidade] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const storedUsuarioId = localStorage.getItem('usuario_id');
    if (storedUsuarioId) {
      setUsuarioId(storedUsuarioId);
    } else {
      navigate('/login');
    }

    const lastStep = localStorage.getItem(`user_${storedUsuarioId}_lastStep`);
    if (lastStep && parseInt(lastStep) !== 1) {
      navigate(`/Step${lastStep}`);
    }
  }, [navigate]);

  const getToken = () => localStorage.getItem("token");

  const sendStep1Data = async () => {
    try {
      const token = getToken();
      await axios.post(
        'http://127.0.0.1:3333/formulario/save-step1',
        {
          nome,
          site,
          linkedin,
          ano_fundacao: anoFundacao.split('-')[0],
          cidade,
          usuario_id: usuarioId
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const nextStep = async () => {
    await sendStep1Data();
    localStorage.setItem(`user_${usuarioId}_lastStep`, step + 1);
    navigate(`/Step${step + 1}`);
  };

  if (!usuarioId) {
    return <div>Carregando...</div>;
  }

  return (
    <Box height="10vh">
      <Center as="header" height={176} bg="#072AC8" color="white" fontWeight="bold" fontSize="4xl" paddingBottom="8" flexDirection="column">
        Bem-vindo ao Investor Report
        <Text fontSize="2xl" fontWeight="normal" mt={2}>Agora você está preenchendo os dados iniciais de sua Startup</Text>
      </Center>

      <Flex align="center" justify="center" bg="blackAlpha.200" height="calc(100vh - 150px)">
        <Center width="100%" maxWidth={840} bg="white" top={120} position="absolute" borderRadius={5} padding="6" boxShadow="0 1px 2px #ccc">
          <FormControl display="flex" flexDirection="column" gap="4">
            <Text fontSize="lg" fontWeight="bold" mb={2}>Dados da Startup</Text>

            <HStack spacing="4">
              <Box width="100%">
                <FormLabel htmlFor="nome">Nome da Startup</FormLabel>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              </Box>

              <Box width="100%">
                <FormLabel htmlFor="site">Site da Startup</FormLabel>
                <Input id="site" value={site} onChange={(e) => setSite(e.target.value)} />
              </Box>
            </HStack>

            <HStack spacing="4">
              <Box width="100%">
                <FormLabel htmlFor="linkedin">Linkedin da Startup</FormLabel>
                <Input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </Box>

              <Box width="100%">
                <FormLabel htmlFor="ano_fundacao">Ano de fundação</FormLabel>
                <Input id="ano_fundacao" type="date" value={anoFundacao} onChange={(e) => setAnoFundacao(e.target.value)} />
              </Box>
            </HStack>

            <Box width="100%">
              <FormLabel>Cidade onde a startup está localizada</FormLabel>
              <Select id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder='Selecione uma opção'>
                {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </Select>
            </Box>

            <Button
              marginTop={4}
              colorScheme="blue"
              onClick={nextStep}
            >
              Próximo
            </Button>
          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default Step1;

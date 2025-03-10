import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Center, FormControl, Input, FormLabel, HStack, Button, Select, Text } from '@chakra-ui/react';
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

  // 🔹 Verifica o último step salvo ao montar o componente
  useEffect(() => {
    const storedUsuarioId = localStorage.getItem('usuario_id'); // Recupera o ID do usuário do localStorage
    if (storedUsuarioId) {
      setUsuarioId(storedUsuarioId); // Define o ID do usuário
    } else {
      // Se não houver um ID no localStorage, pode redirecionar ou definir um valor padrão
      navigate('/login'); // Exemplo de redirecionamento
    }

    const lastStep = localStorage.getItem(`user_${storedUsuarioId}_lastStep`);
    if (lastStep && parseInt(lastStep) !== 1) {
      navigate(`/Step${lastStep}`);
    }
  }, [navigate]);

  // 🔹 Função para obter o token salvo no localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // 🔹 Função para salvar os dados do Step 1 no backend
  const sendStep1Data = async () => {
    try {
      const token = getToken(); // Obtém o token salvo no localStorage

      const response = await axios.post(
        'http://127.0.0.1:3333/formulario/save-step1',
        {
          nome,
          site,
          linkedin,
          ano_fundacao: anoFundacao.split('-')[0], // Certifique-se que 'anoFundacao' é uma data válida
          cidade,
          usuario_id: usuarioId
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}, // Adiciona o token ao cabeçalho se existir
        }
      );

      if (response.status === 200) {
        console.log('Dados enviados com sucesso:', response.data);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  // 🔹 Avançar para o próximo passo e salvar o último step
  const nextStep = async () => {
    await sendStep1Data();
    const newStep = step + 1;
    localStorage.setItem(`user_${usuarioId}_lastStep`, newStep);
    navigate(`/Step${newStep}`);
  };

  if (!usuarioId) {
    // Caso o usuário ainda não tenha o ID, pode renderizar um carregando ou nada até obter o ID.
    return <div>Carregando...</div>;
  }

  return (
    <Box height="10vh">
      <Center as="header" height={176} bg="#072AC8" color="white" fontWeight="bold" fontSize="4xl" paddingBottom="8" flexDirection="column">
        Bem-vindo ao Investor Report
        <Text fontSize="2xl" fontWeight="normal" mt={2}>Agora você está preenchendo os dados iniciais de sua Startup</Text>
      </Center>

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

          <HStack>
            <Box width="100%">
              <FormLabel>Cidade onde a startup está localizada</FormLabel>
              <Select id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder='Selecione uma opção'>
              <option value='AC'>AC</option>
                    <option value='AL'>AL</option>
                    <option value='AP'>AP</option>
                    <option value='AM'>AM</option>
                    <option value='BA'>BA</option>
                    <option value='CE'>CE</option>
                    <option value='DF'>DF</option>
                    <option value='ES'>ES</option>
                    <option value='GO'>GO</option>
                    <option value='MA'>MA</option>
                    <option value='MT'>MT</option>
                    <option value='MS'>MS</option>
                    <option value='MG'>MG</option>
                    <option value='PA'>PA</option>
                    <option value='PB'>PB</option>
                    <option value='PR'>PR</option>
                    <option value='PE'>PE</option>
                    <option value='PI'>PI</option>
                    <option value='RJ'>RJ</option>
                    <option value='RN'>RN</option>
                    <option value='RS'>RS</option>
                    <option value='RO'>RO</option>
                    <option value='RR'>RR</option>
                    <option value='SC'>SC</option>
                    <option value='SP'>SP</option>
                    <option value='SE'>SE</option>
                    <option value='TO'>TO</option>
              </Select>
            </Box>
          </HStack>

          <Button
            marginTop={4}
            colorScheme="teal"
            onClick={nextStep}
            bg="blue"
            color="white"
            _hover={{ bg: "white", color: "blue", border: "2px solid blue" }}
          >
            Próximo
          </Button>
        </FormControl>
      </Center>
    </Box>
  );
}

export default Step1;

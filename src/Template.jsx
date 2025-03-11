import { Grid, Box, Text, Flex, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Template({ id, onBack }) { 
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    telefone: '',
    problema: '',
    solucao: '',
    proposta_valor: '',
    tam_sam_som: '',
    recebeu_investimento: '',
    valor_ultima_capta: '',
    mrr: '',
    valuation: '',
    ticket_medio: '',
    qtd_colaboradores: '',
    modelo_negocio: '',
    vertical_atuacao: '',
  });

  const [error, setError] = useState(null);

  const fetchFormData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/formulario/${id}`); 
      if (response.data) {
        setDados(response.data);
      } else {
        console.error('Nenhum dado retornado da API');
      }
    } catch (err) {
      console.error('Erro na API:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'Erro ao buscar dados.');
    }
  };

  useEffect(() => {
    if (id) {
      fetchFormData(id);
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.50">
      <Box
        p={4}
        bg="white"
        width="210mm"
        height="298mm"
        border="1px solid gray"
        display="flex"
        flexDirection="column"
        overflowY="auto"
      >
        <Flex gap={4} mb={4} display={{ base: "flex", print: "none" }}>
          <Button onClick={onBack} colorScheme="blue" mr={2}>Voltar</Button>
          <Button onClick={handlePrint} colorScheme="blue">Imprimir</Button>
        </Flex>

        <Grid templateColumns="repeat(3, 1fr)" gap={4} width="100%">
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">NOME</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.nome || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">E-MAIL</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.email || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">TELEFONE</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.telefone || 'N/A'}</Box>
          </Box>
        </Grid>

        <Text fontSize="md" fontWeight="bold" mt={4} mb={2} color="#072AC8">QUAL O PROBLEMA QUE VOCÊ SE PROPÕE A RESOLVER?</Text>
        <Box bg="gray.200" h={28} mb={2} width="100%" borderRadius="md">{dados.problema || 'N/A'}</Box>

        <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">QUAL SOLUÇÃO VOCÊ ENTREGA PARA O PROBLEMA APRESENTADO?</Text>
        <Box bg="gray.200" h={28} mb={2} width="100%" borderRadius="md">{dados.solucao || 'N/A'}</Box>

        <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">QUAL SUA PROPOSTA DE VALOR?</Text>
        <Box bg="gray.200" h={28} mb={2} width="100%" borderRadius="md">{dados.proposta_valor || 'N/A'}</Box>

        <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">O MERCADO</Text>
        <Box bg="gray.200" h={28} mb={2} width="100%" borderRadius="md">{dados.tam_sam_som || 'N/A'}</Box>

        <Flex direction="row" align="center" gap={4} mt={4}>
          <Flex direction="column" gap={2}>
            <Text fontSize="md" fontWeight="bold" color="#072AC8">JÁ RECEBEU INVESTIMENTO?</Text>
            <Flex direction="row" align="center" gap={4}>
              <Box bg={dados.recebeu_investimento === 'sim' ? '#072AC8' : 'gray.200'} color={dados.recebeu_investimento === 'sim' ? 'white' : 'black'} p={2} borderRadius="md">SIM</Box>
              <Box bg={dados.recebeu_investimento === 'não' ? '#072AC8' : 'gray.200'} color={dados.recebeu_investimento === 'não' ? 'white' : 'black'} p={2} borderRadius="md">NÃO</Box>
            </Flex>
          </Flex>

          <Flex direction="column" width="210px" gap={2}>
            <Text fontSize="md" fontWeight="bold" color="#072AC8">VALOR DO INVESTIMENTO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.valor_ultima_capta || 'N/A'}</Box>
          </Flex>
        </Flex>

        <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
          <Flex direction="column" gap={4}>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">MRR</Text>
              <Box bg="gray.200" p={2} borderRadius="md">{dados.mrr || 'N/A'}</Box>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">VALUATION</Text>
              <Box bg="gray.200" p={2} borderRadius="md">{dados.valuation || 'N/A'}</Box>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">TICKET MÉDIO</Text>
              <Box bg="gray.200" p={2} borderRadius="md">{dados.ticket_medio || 'N/A'}</Box>
            </Box>
          </Flex>

          <Flex direction="column" gap={4}>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">QUANTIDADE DE COLABORADORES</Text>
              <Box bg="gray.200" p={2} borderRadius="md">{dados.qtd_colaboradores || 'N/A'}</Box>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">MODELO DE NEGÓCIO</Text>
              <Box bg="gray.200" p={2} borderRadius="md">{dados.modelo_negocio || 'N/A'}</Box>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">VERTICAL DE ATUAÇÃO</Text>
              <Box bg="gray.200" p={2} borderRadius="md">{dados.vertical_atuacao || 'N/A'}</Box>
            </Box>

            <Box>
            <Text bottom={2} right={2} fontSize="sm"  color="gray.500" whiteSpace="nowrap">Gerado de acordo com as informações fornecidas | by Loor.vc</Text>
            </Box>
          </Flex>
        </Grid>

        {error && (
          <Box mt={4} p={3} bg="red.300" borderRadius="md" color="white">
            {error}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Template;

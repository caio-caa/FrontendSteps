import { Grid, Box, Text, Flex, Button, Divider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function InvestorReportView({ id, onBack }) {
  const [dados, setDados] = useState({
    nome: '',
    site: '',
    linkedin: '',
    ano_fundacao: '',
    cidade: '',
    modelo_negocio: '',
    vertical_atuacao: '',
    problema: '',
    solucao: '',
    cliente_ideal: '',
    proposta_valor: '',
    maturidade: '',
    qtd_colaboradores: '',
    estrategia_aquisicao: '',
    base_clientes: '',
    plano_crescimento: '',
    maior_desafio: '',
    tecnologias: '',
    tam_sam_som: '',
    concorrentes: '',
    fonte_receita: '',
    recebeu_investimento: '',
    percentual_equity_disponivel: '',
    impacto_gateway_pagamento: '',
    impacto_realidade_aumentada: '',
    impacto_analise_dados: '',
    impacto_ia: '',
    impacto_blockchain: '',
    impacto_cripto: '',
    impacto_tokenizacao: '',
    investimentos_recebidos: '',
    mrr: '',
    valor_ultima_capta: '',
    ticket_medio: '',
    percentual_equity_negociado: '',
    status_captacao_aberta: '',
    valor_buscado: '',
    valuation: '',
    cap_table_socios: '',
    estrategia_saida: '',
    alocacao_recursos: '',
    pitch_link: '',
    valor_investimento: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchReportData = async (id) => {
    if (!id) {
      setError('ID inválido. Não é possível buscar dados.');
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:3333/formulario/todos`);
      const data = response.data;
      
      // Encontrando o item específico pelo ID
      const item = data.find(entry => entry.id === id);
      
      if (item) {
        setDados(item);
      } else {
        setError('Nenhum dado encontrado para este ID.');
      }
    } catch (err) {
      console.error('Erro na API:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'Erro ao buscar dados.');
    }
  };

  useEffect(() => {
    if (id) {
      fetchReportData(id);
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/lista');
    }
  };

  if (error) {
    return <Box p={4} color="red.500">{error}</Box>;
  }

  if (!dados) {
    return <Box p={4}>Carregando...</Box>;
  }

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

export default InvestorReportView;

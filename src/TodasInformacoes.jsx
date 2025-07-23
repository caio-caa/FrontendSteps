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
        height="297mm"
        border="1px solid gray"
        display="flex"
        flexDirection="column"
        overflowY="auto"
      >
        <Flex gap={4} mb={4} display={{ base: 'flex', print: 'none' }}>
          <Button onClick={handleBack} colorScheme="blue" mr={2}>Voltar</Button>
          <Button onClick={handlePrint} colorScheme="blue">Imprimir</Button>
        </Flex>

        <Text fontSize="2xl" fontWeight="bold" mb={4} color="#072AC8">Relatório de Investidor</Text>

        {/* Informações principais */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">NOME</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.nome || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">SITE</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.site || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">LINKEDIN</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.linkedin || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">ANO DE FUNDAÇÃO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.ano_fundacao || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">CIDADE</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.cidade || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">MODELO DE NEGOCIO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.modelo_negocio || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">VERTICA DE ATUAÇÃO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.vertical_atuacao || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">PROPOSTA DE VALOR</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.proposta_valor || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">MATURIDADE</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.maturidade || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">QUANTIDADE DE COLABORADORES</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.qtd_colaboradores || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">ESTRATEGIA AQUISIÇÃO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.estrategia_aquisicao || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">BASE DE CLIENTES</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.base_clientes || 'N/A'}</Box>
          </Box>


        </Grid>
        <Divider my={4} />


        {/* Dados financeiros */}
        <Text fontSize="lg" fontWeight="bold" mt={4} color="#072AC8">Dados Financeiros</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={2}>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">MRR</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.mrr || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">VALOR ÚLTIMA CAPTA</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.valor_ultima_capta || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">TICKET MÉDIO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.ticket_medio || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">VALOR INICIAL CAPTADO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.valor_investimento || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">VALUATION</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.valuation || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">FONTE DE RECEITA</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.fonte_receita || 'N/A'}</Box>
          </Box>
        </Grid>


        <Divider my={4} />
        {/* Descrição do Negócio */}
        <Text fontSize="lg" fontWeight="bold" mt={4} >Descrição do Negócio</Text>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">PROBLEMA</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.problema || 'N/A'}</Box>
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">SOLUÇÃO</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.solucao || 'N/A'}</Box>
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">CLIENTE IDEAL</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.cliente_ideal || 'N/A'}</Box>
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">PROPOSTA DE VALOR</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.proposta_valor || 'N/A'}</Box>
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">ESTRATÉGIA AQUISIÇÃO</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.estrategia_aquisicao || 'N/A'}</Box>
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">PLANO DE CRESCIMENTO</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.plano_crescimento || 'N/A'}</Box>
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">MAIOR DESAFIO</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.maior_desafio || 'N/A'}</Box>
        </Box>
        <Divider my={4} />


        {/* Impactos e Tecnologias */}
        <Text fontSize="lg" fontWeight="bold" mt={4} >Tecnologias</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={2}>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">GATEWAY PAGAMENTO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.impacto_gateway_pagamento || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">IA</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.impacto_ia || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">BLOCKCHAIN</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.impacto_blockchain || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">REALIDADE AUMENTADA</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.impacto_realidade_aumentada || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">ANALISE DE DADOS</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.impacto_analise_dados || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">CRIPTO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.impacto_cripto || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">TOKENIZAÇÃO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.impacto_tokenizacao || 'N/A'}</Box>
          </Box>
        </Grid>

        <Divider my={4} />


        <Text fontSize="lg" fontWeight="bold" mt={4} >Dados de Investimento</Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={2}>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">CONCORRENTES</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.concorrentes || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">CAP TABLE SOCIOS</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.cap_table_socios || 'N/A'}</Box>
          </Box>
        </Grid>

        {/* Outras Informações */}
        <Text fontSize="lg" fontWeight="bold" mt={4} >Outras Informações</Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={2}>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">TAM | SAM | SOM</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.tam_sam_som || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">pitch_link</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.pitch_link || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">TECNOLOGIAS</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.tecnologias || 'N/A'}</Box>
          </Box>
        </Grid>

        <Divider my={4} />
        {/* Dados financeiros */}
        <Text fontSize="lg" fontWeight="bold" mt={4} >IDEIA DO QUE BOTAR</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={2}>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">RECEBEU INVESTIMENTO?</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.recebeu_investimento || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">EQUITY DISPONIVEL</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.percentual_equity_disponivel || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">EQUITY NEGOCIADO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.percentual_equity_negociado || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">CAPTAÇÃO ABERTA</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.status_captacao_aberta || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">VALOR BUSCADO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.valor_buscado || 'N/A'}</Box>
          </Box>

        </Grid>

        <Divider my={4} />

        {/* Estratégias e Alocação */}
        <Text fontSize="lg" fontWeight="bold" mt={4} >Estratégias e Alocação</Text>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">ESTRATÉGIA SAÍDA</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.estrategia_saida || 'N/A'}</Box>
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">ALOCAÇÃO DE RECURSOS</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.alocacao_recursos || 'N/A'}</Box>
        </Box>

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

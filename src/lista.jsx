import { 
  Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, 
  Button, Spinner, Center, Alert, AlertIcon, Input, Select, Box, 
  Flex, Heading 
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Template from './Template';
import TemplateReport from './TemplateReport';
import TodasInformacoes from './TodasInformacoes';

function Lista() {
  const [formularios, setFormularios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVertical, setFilterVertical] = useState('');
  const [redirectTemplateReport, setRedirectTemplateReport] = useState(null);
  const [redirectTodasInformacoes, setRedirectTodasInformacoes] = useState(null);

  useEffect(() => {
    const fetchFormulario = async () => {
      console.log('Buscando lista de registros do formulário da API');
      try {
        const response = await axios.get('http://127.0.0.1:3333/formulario/todos');
        setFormularios(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Erro ao buscar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormulario();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/formulario/${id}`, { status: newStatus });
      setFormularios((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err) {
      setError('Erro ao atualizar o status.');
    }
  };

  const handleVerMais = (id) => setSelectedId(id);
  const handleOpenTemplateReport = (id) => setRedirectTemplateReport(id);
  const handleOpenTodasInformacoes = (id) => setRedirectTodasInformacoes(id);
  const handleBack = () => {
    setSelectedId(null);
    setRedirectTemplateReport(null);
    setRedirectTodasInformacoes(null);
  };

  const filteredData = formularios.filter(
    (item) =>
      ((item.nome && item.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.numero_telefone && item.numero_telefone.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (filterVertical === '' || item.vertical_atuacao === filterVertical)
  );

  if (loading) {
    return (
      <Center py={6}>
        <Spinner size="xl" color="blue.500" />
        <p>Carregando dados...</p>
      </Center>
    );
  }

  if (selectedId) {
    return <Template id={selectedId} onBack={handleBack} />;
  }

  if (redirectTemplateReport) {
    return <TemplateReport id={redirectTemplateReport} onBack={handleBack} />;
  }

  if (redirectTodasInformacoes) {
    return <TodasInformacoes id={redirectTodasInformacoes} onBack={handleBack} />;
  }

  return (
    <div>
      <Flex gap={4} mb={4} p={4} justifyContent="center">
        <Input
          placeholder="Pesquisar por nome ou telefone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="300px"
        />
        <Select
          placeholder="Selecionar vertical de atuação"
          value={filterVertical}
          onChange={(e) => setFilterVertical(e.target.value)}
          width="300px"
        >
          <option value="Fintech">Fintech</option>
          <option value="Edtech">Edtech</option>
          <option value="Govtech">Govtech</option>
          <option value="Mediatech">Mediatech</option>
          <option value="Healthtech">Healthtech</option>
        </Select>
      </Flex>

      <Center>
        <Box bg="gray.100" p={4} borderRadius="md" width="90%">
          <TableContainer>
            <Heading as="h3" size="sm" mb={4} textAlign="center" color="gray.500">
              Lista de Startups que responderam o Investor Report
            </Heading>

            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome da Startup</Th>
                  <Th>Telefone</Th>
                  <Th>Vertical de Atuação</Th>
                  <Th>One Page</Th>
                  <Th>Investor Report</Th>
                  <Th>Todas Informações</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((registro) => (
                    <Tr key={registro.id}>
                      <Td>{registro.id}</Td>
                      <Td>{registro.nome}</Td>
                      <Td>{registro.numero_telefone}</Td>
                      <Td>{registro.vertical_atuacao}</Td>
                      <Td>
                        <Button
                          bg={'#072AC8'}
                          colorScheme="blue"
                          size="sm"
                          onClick={() => handleVerMais(registro.id)}
                        >
                          One Page
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          bg={'#072AC8'}
                          colorScheme="blue"
                          size="sm"
                          onClick={() => handleOpenTemplateReport(registro.id)}
                        >
                          Investor Report
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          bg={'#072AC8'}
                          colorScheme="blue"
                          size="sm"
                          onClick={() => handleOpenTodasInformacoes(registro.id)}
                        >
                          Todas Informações
                        </Button>
                      </Td>
                      <Td>
                        <Select
                          value={registro.status || "Em análise"}
                          onChange={(e) => handleStatusChange(registro.id, e.target.value)}
                          size="sm"
                          bg="#072AC8"
                          color="white"
                          _focus={{ bg: "#1E3A8A" }}
                        >
                          <option value="Em análise" style={{ color: 'black', backgroundColor: '#ffff' }}>
                            Em análise
                          </option>
                          <option value="Concluído" style={{ color: 'black', backgroundColor: '#ffff' }}>
                            Concluído
                          </option>
                          <option value="Enviado" style={{ color: 'black', backgroundColor: '#ffff' }}>
                            Enviado
                          </option>
                        </Select>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="7" textAlign="center">
                      {error ? (
                        <Alert status="error">
                          <AlertIcon />
                          {error}
                        </Alert>
                      ) : (
                        'Nenhum registro encontrado.'
                      )}
                    </Td>
                  </Tr>
                )}
              </Tbody>
              <TableCaption>Fim</TableCaption>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </div>
  );
}

export default Lista;

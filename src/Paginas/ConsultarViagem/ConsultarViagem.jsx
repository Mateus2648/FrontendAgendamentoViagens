import React, { useEffect, useState } from "react"; // Importa React e hooks necessários
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação
import { Footer } from "../../Componentes/Footer/Footer.jsx"; // Importa o componente Footer
import { Header } from "../../Componentes/Header/Header"; // Importa o componente Header
import { api } from "../../Services/api"; // Importa a instância da API para fazer requisições
import "./styles.css"; // Importa o arquivo de estilos CSS

const ConsultaViagem = () => {
  // Declaração de estados usando useState
  const [consulta, setConsulta] = useState(""); // Estado para armazenar o texto da consulta
  const [viagens, setViagens] = useState([]); // Estado para armazenar a lista de viagens
  const [acompanhantes, setAcompanhante] = useState(null); // Estado para armazenar os dados do acompanhante
  const [viagensFiltradas, setViagensFiltradas] = useState([]); // Estado para armazenar as viagens filtradas pela consulta
  const [viagemSelecionada, setViagemSelecionada] = useState(null); // Estado para armazenar a viagem selecionada
  const navigate = useNavigate(); // Inicializa o hook de navegação
  const userData = JSON.parse(localStorage.getItem("userData")); // Recupera os dados do usuário do localStorage

  // Verifica se userData existe e redireciona para a tela de login se não existir
  useEffect(() => {
    if (!userData) {
      navigate("/login"); // Redireciona para a página de login
    }
  }, [userData, navigate]); // Dependências: userData e navigate

  // Efeito para buscar as viagens ao montar o componente
  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const response = await api.get("viagem"); // Faz uma requisição GET para buscar as viagens
        setViagens(response.data); // Armazena as viagens no estado
        const viagens = response.data;
        const AC = viagens.map((viagem) => viagem.ac);
        const AD = viagens.map((viagem) => viagem.ac_id);
        // Exibir os dados das viagens no console
        //console.log("Dados das Viagens:", viagens);

        // Verifica se há um ID de acompanhante na resposta
        if (AC[0]) {
          // Busca os dados do acompanhante usando o ID da viagem
          const response = await api.get(`acompanhante/${AD[0]}`);
          setAcompanhante(response.data); // Armazena os dados do acompanhante no estado
          //const acompanhantes = response.data;
          //const ACompID = acompanhantes.map((acompanhante) => acompanhante.id);
          //const ACompNOME = acompanhantes.map((acompanhante) => acompanhante.nome_acompanhante);
          // Exibir os dados das viagens no console
          //console.log("Dados do Acompanhante:", acompanhantes);
        }
      } catch (error) {
        console.error("Erro ao buscar viagens:", error); // Loga o erro no console
      }
    };

    fetchViagens(); // Chama a função para buscar as viagens
  }, []); // Efeito executado apenas uma vez ao montar o componente

  // Função para atualizar o estado da consulta quando o input muda
  const handleConsultaChange = (e) => {
    setConsulta(e.target.value); // Atualiza o estado com o valor do input
  };

  // Função para filtrar as viagens com base na consulta
  const handlePesquisar = () => {
    const viagensFiltradas = viagens.filter(
      (viagem) =>
        viagem.nome_paciente?.toLowerCase().includes(consulta.toLowerCase()) // Filtra as viagens pelo nome do paciente
    );
    setViagensFiltradas(viagensFiltradas); // Atualiza o estado com as viagens filtradas
    if (viagensFiltradas.length === 0) {
      alert("Nenhuma viagem encontrada com o nome do paciente pesquisado."); // Alerta se nenhuma viagem for encontrada
    }
  };

  // Função para definir a viagem selecionada
  const handleViagemSelecionada = (viagem) => {
    setViagemSelecionada(viagem); // Atualiza o estado com a viagem selecionada
  };

  // Função para navegar para a página de edição da viagem
  const handleEditarViagem = () => {
    navigate("/alteracao-viagem", {
      state: { viagem: viagemSelecionada, acompanhante: acompanhantes },
    }); // Navega para a página de edição passando a viagem selecionada
  };

  // Função para deletar a viagem selecionada
  const handleDeletarViagem = async () => {
    try {
      // Faz uma requisição DELETE para remover a viagem com o ID da viagem selecionada
      const response = await api.delete(`viagem/${viagemSelecionada.id}`);

      // Verifica se a resposta foi bem-sucedida (status 204 indica que a operação foi realizada com sucesso)
      if (response.status === 204) {
        // Atualiza o estado 'viagens' removendo a viagem deletada da lista
        setViagens(
          viagens.filter((viagem) => viagem.id !== viagemSelecionada.id)
        );

        // Limpa a viagem selecionada, pois ela foi deletada
        setViagemSelecionada(null);

        // Atualiza o estado 'viagensFiltradas' removendo a viagem deletada da lista filtrada
        setViagensFiltradas(
          viagensFiltradas.filter(
            (viagem) => viagem.id !== viagemSelecionada.id
          )
        );

        // Exibe um alerta informando que a viagem foi deletada com sucesso
        alert("Viagem deletada com sucesso!");
      } else {
        // Se a resposta não for 204, exibe um alerta de erro
        alert("Erro ao deletar viagem");
      }
    } catch (error) {
      // Captura e loga qualquer erro que ocorra durante a requisição
      console.error("Erro ao deletar viagem:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="consul">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Consultar Viagens</h2>
          <label>Nome do Paciente </label>
          <input
            type="text"
            id="consultaNome"
            value={consulta}
            onChange={handleConsultaChange}
          />
          <button type="button" onClick={handlePesquisar}>
            Pesquisar
          </button>
        </form>
        {viagensFiltradas.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Nome do Paciente</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {viagensFiltradas.map((viagem) => (
                <tr key={viagem.id}>
                  <td>{viagem.nome_paciente}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleViagemSelecionada(viagem)}
                    >
                      Selecionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {viagemSelecionada && (
          <div>
            <h3>Detalhes da Viagem</h3>
            <table>
              <tbody>
                <tr>
                  <td>Data:</td>
                  <td>{viagemSelecionada.data_select}</td>
                </tr>
                <tr>
                  <td>Hora:</td>
                  <td>{viagemSelecionada.hora_select}</td>
                </tr>
                <tr>
                  <td>Nome do Paciente:</td>
                  <td>{viagemSelecionada.nome_paciente}</td>
                </tr>
                <tr>
                  <td>RG do Paciente:</td>
                  <td>{viagemSelecionada.rg_paciente}</td>
                </tr>
                <tr>
                  <td>Telefone do Paciente:</td>
                  <td>{viagemSelecionada.tel_paciente}</td>
                </tr>
                <tr>
                  <td>Destino:</td>
                  <td>{viagemSelecionada.destino}</td>
                </tr>
                <tr>
                  <td>Endereço do Destino:</td>
                  <td>{viagemSelecionada.end_destino}</td>
                </tr>
                <tr>
                  <td>Ponto do Paciente:</td>
                  <td>{viagemSelecionada.ponto_paciente}</td>
                </tr>
                <tr>
                  <td>Observações:</td>
                  <td>{viagemSelecionada.obs}</td>
                </tr>
                {acompanhantes &&
                  acompanhantes.map((acompanhante) => (
                    <>
                      <tr>
                        <td>Nome do Acompanhante:</td>
                        <td>{acompanhante.nome_acompanhante}</td>
                      </tr>
                      <tr>
                        <td>RG do Acompanhante:</td>
                        <td>{acompanhante.rg_acompanhante}</td>
                      </tr>
                      <tr>
                        <td>Endereço do Acompanhante:</td>
                        <td>{acompanhante.end_acompanhante}</td>
                      </tr>
                      <tr>
                        <td>Ponto do Acompanhante:</td>
                        <td>{acompanhante.ponto_acompanhante}</td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
            <button type="button" onClick={handleEditarViagem}>
              Editar
            </button>
            <button type="button" onClick={handleDeletarViagem}>
              Deletar
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export { ConsultaViagem };

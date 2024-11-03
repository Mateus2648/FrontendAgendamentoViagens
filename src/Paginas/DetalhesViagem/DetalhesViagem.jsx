import React, { useEffect, useState } from "react"; // Importa React e hooks necessários
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação
import { Footer } from "../../Componentes/Footer/Footer.jsx"; // Importa o componente Footer
import { Header } from "../../Componentes/Header/Header"; // Importa o componente Header
import { api } from "../../Services/api"; // Importa a instância da API para fazer requisições
import "./styles.css"; // Importa o arquivo de estilos CSS

const DetalhesViagem = () => {
  const [detalhes, setDetalhes] = useState("");
  const [viagens, setViagens] = useState([]);
  const [acompanhantes, setAcompanhante] = useState(null);
  const [viagensFiltradas, setViagensFiltradas] = useState([]);
  const [viagemSelecionada, setViagemSelecionada] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const response = await api.get("viagem");
        setViagens(response.data);
        setViagensFiltradas(response.data); // Armazena todas as viagens no estado de filtradas inicialmente
        const AC = response.data.map((viagem) => viagem.ac);
        const AD = response.data.map((viagem) => viagem.ac_id);

        if (AC[0]) {
          const responseAcompanhante = await api.get(`acompanhante/${AD[0]}`);
          setAcompanhante(responseAcompanhante.data);
        }
      } catch (error) {
        console.error("Erro ao buscar viagens:", error);
      }
    };

    fetchViagens();
  }, []);

  /*const handleConsultaChange = (e) => {
      setConsulta(e.target.value);
    };
    */

  /* const handlePesquisar = () => {
      const viagensFiltradas = viagens.filter((viagem) =>
        viagem.nome_paciente?.toLowerCase().includes(consulta.toLowerCase())
      );
      setViagensFiltradas(viagensFiltradas);
      if (viagensFiltradas.length === 0) {
        alert("Nenhuma viagem encontrada com o nome do paciente pesquisado.");
      }
    }; */

  const handleViagemSelecionada = (viagem) => {
    setViagemSelecionada(viagem);
  };

  const handleEditarViagem = () => {
    navigate("/alteracao-viagem", {
      state: { viagem: viagemSelecionada, acompanhante: acompanhantes },
    });
  };

  const handleDeletarViagem = async () => {
    try {
      const response = await api.delete(`viagem/${viagemSelecionada.id}`);
      if (response.status === 204) {
        setViagens(
          viagens.filter((viagem) => viagem.id !== viagemSelecionada.id)
        );
        setViagemSelecionada(null);
        setViagensFiltradas(
          viagensFiltradas.filter(
            (viagem) => viagem.id !== viagemSelecionada.id
          )
        );
        alert("Viagem deletada com sucesso!");
      } else {
        alert("Erro ao deletar viagem");
      }
    } catch (error) {
      console.error("Erro ao deletar viagem:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="consul">
        <h2>Consultar Viagens</h2>
        {/* Renderiza todas as viagens carregadas */}

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

export { DetalheViagem };

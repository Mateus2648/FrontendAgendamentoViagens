import React, { useEffect, useState } from "react"; // Importa React e hooks necessários
import { useLocation, useNavigate } from "react-router-dom"; // Importa os hooks useNavigate e useLocation
import { Footer } from "../../Componentes/Footer/Footer.jsx"; // Importa o componente Footer
import { Header } from "../../Componentes/Header/Header"; // Importa o componente Header
import { api } from "../../Services/api"; // Importa a instância da API para fazer requisições
import "./styles.css"; // Importa o arquivo de estilos CSS

const DetalheViagem = () => {
  const [viagemSelecionada, setViagemSelecionada] = useState(null);
  const [acompanhante, setAcompanhante] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Usando useLocation para acessar o estado
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  useEffect(() => {
    const fetchAcompanhante = async () => {
      if (location.state && location.state.viagem) {
        const viagemSelecionada = location.state.viagem;
        setViagemSelecionada(viagemSelecionada);
        const AD_acompanhante = viagemSelecionada.ac_id;

        try {
          const response = await api.get(`acompanhante/${AD_acompanhante}`);
          setAcompanhante(response.data || null); // Caso acompanhante seja null
        } catch (error) {
          console.error("Erro ao buscar acompanhante:", error);
        }
      }
    };

    fetchAcompanhante();
  }, [location.state]);

  // Exibir os dados das viagens no console
  //console.log("Dados da Viagem:", viagemSelecionada);
  //console.log("Dados do Acompanhante:", acompanhante);

  const handleEditarViagem = () => {
    navigate("/alteracao-viagem", {
      state: { viagem: viagemSelecionada, acompanhante: acompanhante },
    });
  };

  return (
    <div>
      <Header />
      <div className="consul">
        <h2>Detalhes da Viagem</h2>
        {/* Renderiza os detalhes da viagem */}
        {viagemSelecionada && (
          <div>
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
                {acompanhante.map((acompanhante, index) => (
                  <React.Fragment key={index}>
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
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleEditarViagem}>
              Editar
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export { DetalheViagem };

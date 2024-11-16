import React, { useEffect, useState } from "react"; // Importa React e hooks necessários
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação
import { Footer } from "../../Componentes/Footer/Footer.jsx"; // Importa o componente Footer
import { Header } from "../../Componentes/Header/Header"; // Importa o componente Header
import { api } from "../../Services/api"; // Importa a instância da API para fazer requisições
import "./styles.css"; // Importa o arquivo de estilos CSS

const ConsultaViagem = () => {
  const [acompanhantes, setAcompanhante] = useState(null);
  const [viagensFiltradas, setViagensFiltradas] = useState([]);
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
        const responseViagem = await api.get("viagem");
        setViagensFiltradas(responseViagem.data); // Armazena todas as viagens no estado de filtradas inicialmente
        const AC = responseViagem.data.map((viagem) => viagem.ac);
        const AD_acompanhante = responseViagem.data.map(
          (viagem) => viagem.ac_id
        );

        //console.log("Dados da Viagem:", responseViagem); // Verifique o que está sendo retornado
        //console.log("ID do Acompanhante:", AD_acompanhante); // Verifique o que está sendo retornado

        if (AC) {
          const responseAcompanhante = await api.get(
            `acompanhante/${AD_acompanhante}`
          );
          setAcompanhante(responseAcompanhante.data);
        }
      } catch (error) {
        console.error("Erro ao buscar viagens:", error);
      }
    };

    fetchViagens();
  }, []);

  const handleViagemSelecionada = (viagem) => {
    navigate("/detalhes-viagem", {
      state: { viagem: viagem, acompanhante: acompanhantes },
    });
  };

  return (
    <div>
      <Header />
      <div className="consul">
        <h2>Consultar Viagens</h2>
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
      </div>
      <Footer />
    </div>
  );
};

export { ConsultaViagem };

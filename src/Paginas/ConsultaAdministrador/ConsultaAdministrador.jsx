import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../Componentes/Footer/Footer";
import { Header } from "../../Componentes/Header/Header";
import { api } from "../../Services/api";
import "./styles.css";

const ConsultaAdministrador = () => {
  const [consultaNomeUsuario, setConsultaNomeUsuario] = useState("");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [loading, setLoading] = useState(false); // Adicionando um estado para controle de carregamento
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  // Verifica se userData existe e redireciona para a tela de login se não existir
  useEffect(() => {
    if (!userData) {
      navigate("/login"); // Redireciona para a página de login
    }
  }, [userData, navigate]);

  const handleConsultaNomeUsuarioChange = (e) => {
    setConsultaNomeUsuario(e.target.value);
  };

  const handleConsultarUsuario = async () => {
    try {
      setLoading(true);
      const response = await api.get("usuario");
      const usuarios = response.data;
      const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(consultaNomeUsuario.toLowerCase())
      );
      localStorage.setItem(
        "usuariosFiltrados",
        JSON.stringify(usuariosFiltrados)
      );
      setUsuariosFiltrados(usuariosFiltrados);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUsuarioSelecionado = (usuario) => {
    setUsuarioSelecionado(usuario);
    console.log("Usuário selecionado:", usuario); // Adicione este log para depuração
};

const handleEditarUsuario = (usuario) => {
  navigate("/alteracao-cadastro", { state: { usuario } });
};

  const handleDeletarUsuario = async () => {
    try {
      const response = await api.delete(`usuario/${usuarioSelecionado.id}`);
      if (response.status === 204) {
        setUsuariosFiltrados(
          usuariosFiltrados.filter((u) => u.id !== usuarioSelecionado.id)
        );
        setUsuarioSelecionado(null);
        alert("Usuário deletado com sucesso!");
      } else {
        alert("Erro ao deletar usuário");
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConsultarUsuario();
  };

  return (
    <div>
      <Header />
      <div className="adm">
        <form onSubmit={handleSubmit}>
          <h2>Consultar Usuários</h2>
          <label> Nome do Usuário </label>
          <input
            type="text"
            id="consultaNomeUsuario"
            value={consultaNomeUsuario}
            onChange={handleConsultaNomeUsuarioChange}
          />
          <button type="submit">Pesquisar</button>
        </form>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
    {usuariosFiltrados.map((usuario) => (
        <tr key={usuario.id}>
            <td>{usuario.nome}</td>
            <td>
                <button type="button" onClick={() => handleEditarUsuario(usuario)}>
                    Editar
                </button>
                <button type="button" onClick={handleDeletarUsuario}>
                    Deletar
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

export { ConsultaAdministrador };

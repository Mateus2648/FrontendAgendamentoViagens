import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/Imagens/logo-best.png";
import usuerOn from "../../Assets/Imagens/usuerOn.png";
import { AccessibilityButton } from "../AccessibilityButton/accessibilityButton"; // Importe o botão de acessibilidade
import "./styles.css";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const userDataArray = JSON.parse(userData);
      const { id, nome, email, roles } = userDataArray[0];
      setUserInfo({ id, nome, email, roles });
      setIsAdmin(roles === 2); //alterado
    } else {
      setUserInfo(null);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData"); // Remove os dados do usuário
    setUserInfo(null);
    setIsAdmin(false);
  };

  return (
    <>
      <header>
        <div className="header__content">
          <nav>
            <figure>
              {userInfo && (
                <Link to="/menu">
                  <img src={logo} alt="Saúde Tour" title="Saúde Tour" />
                </Link>
              )}
              {!userInfo && (
                <Link to="/login">
                  <img src={logo} alt="Saúde Tour" title="Saúde Tour" />
                </Link>
              )}
            </figure>

            <div className="nav__button">
              {userInfo && (
                <Link to="/cadastro-viagem">Cadastro de Viagens</Link>
              )}
              {userInfo && (
                <Link to="/cadastro-motorista">Cadastro de Motorista</Link>
              )}
              {userInfo && <Link to="/consulta-viagem">Consultar Viagem</Link>}
              {isAdmin && (
                <Link to="/consulta-administrador">Consultar Usuários</Link>
              )}

              {userInfo ? (
                <div className="user-info">
                  <figure>
                    <Link to="/menu">
                      <img
                        className="image-name"
                        src={usuerOn}
                        alt="Online"
                        title="Online"
                      />
                    </Link>
                  </figure>
                  <span className="user-name">{userInfo.nome}</span>
                  <Link to="/" onClick={handleLogout}>
                    Sair
                  </Link>
                </div>
              ) : (
                <Link to="/login">Entrar</Link>
              )}
            </div>
          </nav>
          {/* Adicionando o botão de acessibilidade */}
          <AccessibilityButton />
        </div>
      </header>
    </>
  );
};

export { Header };

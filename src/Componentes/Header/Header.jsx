import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/Imagens/logo-best.png";
import usuerOn from "../../Assets/Imagens/usuerOn.png";
import { AccessibilityButton } from "../AccessibilityButton/accessibilityButton"; // Importe o botão de acessibilidade
import "./styles.css";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const userDataArray = JSON.parse(userData);
      const { id, nome, email, roles } = userDataArray[0];
      setUserInfo({ id, nome, email, roles });
      setIsAdmin(roles === 2);
    } else {
      setUserInfo(null);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserInfo(null);
    setIsAdmin(false);
  };

  // Função para alternar o menu
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Alterna o estado do menu
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

            <button className="menu-button" onClick={toggleMenu}>
              ☰ {/* Ícone de menu */}
            </button>

            {/* Renderização condicional para desktop e mobile */}
            <div className={`nav__button ${isMenuOpen ? 'menu-active' : ''}`}>
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
                <><div className="user-info">
                  <figure>
                    <Link to="/menu">
                      <img
                        className="image-name"
                        src={usuerOn}
                        alt="Online"
                        title="Online" />
                    </Link>
                  </figure>
                  <span className="user-name">{userInfo.nome}</span>
                </div><div className="logout-container">
                    <Link to="/" onClick={handleLogout} className="logout-link">
                      Sair
                    </Link>
                  </div></>
              ) : (
                <Link to="/login">Entrar</Link>
              )}
            </div>
          </nav>
          <AccessibilityButton />
        </div>
      </header>
    </>
  );
};

export { Header };

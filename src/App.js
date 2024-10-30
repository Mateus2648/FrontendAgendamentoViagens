import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AlteracaoCadastro } from "./Paginas/AlteracaoCadastro/AlteracaoCadastro.jsx";
import { AlteracaoViagem } from "./Paginas/AlteracaoViagem/AlteracaoViagem.jsx";
import { CadastroMotorista } from "./Paginas/CadastroMotorista/CadastroMotorista.jsx";
import { CadastroViagem } from "./Paginas/CadastroViagem/CadastroViagem.jsx";
import { ConsultaAdministrador } from "./Paginas/ConsultaAdministrador/ConsultaAdministrador.jsx";
import { ConsultaViagem } from "./Paginas/ConsultarViagem/ConsultarViagem.jsx";
import { CriarConta } from "./Paginas/CriarConta/CriarConta.jsx";
import { Home } from "./Paginas/Home/Home.jsx";
import { Login } from "./Paginas/Login/Login.jsx";
import { Menu } from "./Paginas/Menu/Menu.jsx";
import { RecuperarSenha } from "./Paginas/RecuperarSenha/RecuperarSenha.jsx";
import { GlobalStyle } from "./Styles/global";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<CriarConta />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/cadastro-viagem" element={<CadastroViagem />} />
          <Route path="/cadastro-motorista" element={<CadastroMotorista />} />
          <Route path="/consulta-viagem" element={<ConsultaViagem />} />
          <Route path="/alteracao-viagem" element={<AlteracaoViagem />} />
          <Route path="/alteracao-cadastro" element={<AlteracaoCadastro />} />
          <Route path="/menu" element={<Menu />} />
          <Route
            path="/consulta-administrador"
            element={<ConsultaAdministrador />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

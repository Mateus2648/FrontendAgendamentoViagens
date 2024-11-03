import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdAccountCircle, MdEmail, MdLock, MdMap } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../Componentes/Button/Button.jsx";
import { Footer } from "../../Componentes/Footer/Footer.jsx";
import { Header } from "../../Componentes/Header/Header.jsx";
import { Input } from "../../Componentes/Input/Input.jsx";
import { Text } from "../../Componentes/Text/Text.jsx";
import { Title } from "../../Componentes/Title/Title.jsx";
import { api } from "../../Services/api";
import "./styles.css";

const AlteracaoCadastro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioSelecionado = location.state?.usuario;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  useEffect(() => {
    if (!usuarioSelecionado) {
      console.error("Nenhum usuário selecionado, redirecionando...");
      navigate("/consulta");
    } else {
      setValue("nome", usuarioSelecionado.nome);
      setValue("email", usuarioSelecionado.email);
      setValue("senha", usuarioSelecionado.senha);
      setValue("matricula", usuarioSelecionado.matricula);
      setValue("roles", usuarioSelecionado.roles);
    }
  }, [usuarioSelecionado, navigate, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await api.put(`usuario/${usuarioSelecionado.id}`, {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        confirma: formData.senha,
        matricula: formData.matricula,
        roles: formData.roles, // Enviamos o valor de roles diretamente
      });

      if (response.status === 204) {
        alert("Cadastro atualizado com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao atualizar o cadastro");
      }
    } catch (error) {
      console.error("Erro ao atualizar o cadastro", error);
    }
  };

  // Função para converter texto para número ao enviar
  const getRoleValue = (role) => {
    return role === "Administrador" ? 2 : 1; // Operador leva 1 e Administrador leva 2
  };

  return (
    <>
      <Header />
      <div className="body__contentcriarconta">
        <div className="body__contentcriarconta--text">
          <Title
            title={
              <span>
                Usuário, realize seu cadastro no sistema novamente alterando os
                itens necessários
              </span>
            }
          />
        </div>
        <div className="body__contentcriarconta--form">
          <Text text={<span> ALTERAÇÃO DE CADASTRO </span>} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="nome">Nome Completo:</label>
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              leftIcon={<MdAccountCircle />}
              id="nome"
              name="nome"
              control={control}
              rules={{ required: "Nome é obrigatório" }}
            />
            {errors.nome && <span>{errors.nome.message}</span>}

            <label htmlFor="email">E-mail:</label>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              leftIcon={<MdEmail />}
              id="email"
              name="email"
              control={control}
              rules={{ required: "E-mail é obrigatório" }}
            />
            {errors.email && <span>{errors.email.message}</span>}

            <label htmlFor="senha">Senha:</label>
            <Input
              type="password"
              placeholder="Digite uma senha"
              leftIcon={<MdLock />}
              id="senha"
              name="senha"
              control={control}
              rules={{ required: "Senha é obrigatória" }}
            />
            {errors.senha && <span>{errors.senha.message}</span>}

            <label htmlFor="confirma">Confirmação de Senha:</label>
            <Input
              type="password"
              placeholder="Confirme sua senha"
              leftIcon={<MdLock />}
              id="confirma"
              name="confirma"
              control={control}
              rules={{ required: "Senha é obrigatória" }}
            />
            {errors.confirma && <span>{errors.confirma.message}</span>}

            <label htmlFor="matricula">Matrícula:</label>
            <Input
              type="text"
              placeholder="Digite sua matrícula"
              leftIcon={<MdMap />}
              id="matricula"
              name="matricula"
              control={control}
              rules={{ required: "Matrícula é obrigatória" }}
            />
            {errors.matricula && <span>{errors.matricula.message}</span>}

            <label htmlFor="roles">Nível de Acesso:</label>
            <select
              id="roles"
              name="roles"
              onChange={(e) => setValue("roles", getRoleValue(e.target.value))}
              defaultValue={usuarioSelecionado.roles === 1 ? "Operador" : "Administrador"}
            >
              <option value="Operador">Operador</option>
              <option value="Administrador">Administrador</option>
            </select>
            {errors.roles && <span>{errors.roles.message}</span>}

            <Button title="Cadastrar" variant="secondary" type="submit" />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export { AlteracaoCadastro };

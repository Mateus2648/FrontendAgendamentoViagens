import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdAccountCircle, MdEmail, MdLock, MdMap } from "react-icons/md";
import { useNavigate } from "react-router-dom";
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
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const userData = localStorage.getItem("userData");
  const userDataArray = JSON.parse(userData);
  const { id } = userDataArray[0];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`usuario/${id}`);
        const userNewData = response.data;

        // Imprimindo o nome do usuário no console
        console.log("Nome do usuário:", userNewData.nome);

        // Definindo os valores dos campos do formulário
        setValue("nome", userNewData.nome);
        setValue("email", userNewData.email);
        setValue("senha", userNewData.senha);
        setValue("matricula", userNewData.matricula);
        setValue("roles", userNewData.roles);
      } catch (error) {
        console.error("Erro ao obter os detalhes do usuário", error);
      }
    };

    fetchUserData();
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await api.put(`usuario/${id}`, {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        confirma: formData.senha,
        matricula: formData.matricula,
        roles: formData.roles,
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

  return (
    <>
      <Header />

      <div className="body__contentcriarconta">
        <div className="body__contentcriarconta--text">
          <Title
            title={
              <span>
                Usúario realize seu cadastro no sistema novamente alterando os
                itens necessários
              </span>
            }
          />
        </div>
        <div className="body__contentcriarconta--form">
          <Text text={<span> ALTERAÇÃO DE CADASTRO </span>} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              leftIcon={<MdAccountCircle />}
              id="nome"
              name="nome"
              control={control}
              //defaultValue={nome} // Define o valor inicial do input como o nome do usuário
              rules={{ required: "Nome é obrigatório" }}
            />
            {errors.nome && <span>{errors.nome.message}</span>}

            <Input
              type="email"
              placeholder="Digite seu e-mail"
              leftIcon={<MdEmail />}
              id="email"
              name="email"
              control={control}
              //defaultValue={email} // Define o valor inicial do input como o email do usuário
              rules={{ required: "E-mail é obrigatório" }}
            />
            {errors.email && <span>{errors.email.message}</span>}

            <Input
              type="password"
              placeholder="Digite uma senha"
              leftIcon={<MdLock />}
              id="senha"
              name="senha"
              control={control}
              pattern="[0-9]*"
              rules={{ required: "Senha é obrigatório" }}
            />
            {errors.senha && <span>{errors.senha.message}</span>}

            <Input
              type="password"
              placeholder="Confirme sua senha"
              leftIcon={<MdLock />}
              id="confirma"
              name="confirma"
              control={control}
              pattern="[0-9]*"
              rules={{ required: "Senha é obrigatório" }}
            />
            {errors.confirma && <span>{errors.confirma.message}</span>}

            <Input
              type="matricula"
              placeholder="Digite sua matrícula"
              leftIcon={<MdMap />}
              id="matricula"
              name="matricula"
              control={control}
              //defaultValue={matricula} // Define o valor inicial do input como a matricula do usuário
              rules={{ required: "Matrícula é obrigatória" }}
            />
            {errors.matricula && <span>{errors.matricula.message}</span>}

            <Input
              type="number"
              placeholder="Digite apenas 1 por padrão"
              leftIcon={<MdMap />}
              id="roles"
              name="roles"
              control={control}
              //defaultValue={roles} // Define o valor inicial do input como o Nivel do usuário
              rules={{ required: "Digite apenas 1" }}
            />
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

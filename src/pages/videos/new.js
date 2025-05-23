import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyle.js";

const Container = styled.div`
  margin: auto;
  width: 100vw;
  
  h1 {
    text-align: center;
    color: #ffffff;
    font-size: 2rem;
  }
`;

const Forms = styled.form`
margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 400px;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 400px;
  padding: 10px;
  background: #007bff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const BackToHome = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  display: block;
  text-align: right;
  margin-right: 20px;

  &:hover {
    color: #ccc;
  }
`;


export default function CreateVideo() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", link: "", thumbnail: "", duration: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();  // Evita comportamento padrão do form
    console.log("Enviando dados:", form); // Para verificar se está pegando os valores

    if (!form.title || !form.description || !form.link || !form.thumbnail || !form.duration) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const response = await axios.post("https://node-api-fvge.onrender.com/videos", form);
      console.log("Resposta do servidor:", response.data);

      alert("Vídeo criado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao criar vídeo:", error.message);
      alert("Erro ao criar vídeo. Verifique os dados e tente novamente.");
    }
  };


  return (
    <>
      <GlobalStyle />
      <Container>
        <h1>Criar Novo Vídeo</h1>
        <BackToHome href="/">✔️ Home</BackToHome>
        <Forms onSubmit={handleSubmit}>
          <Input type="text" placeholder="Título" onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input type="text" placeholder="Descrição" onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input type="text" placeholder="Link do vídeo" onChange={(e) => setForm({ ...form, link: e.target.value })} />
          <Input type="text" placeholder="Imagem Thumbnail" onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
          <Input type="number" placeholder="Duração (segundos)" onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          <Button type="submit">Criar</Button>
        </Forms>
      </Container>
    </>
  );
}

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export default function CreateVideo() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", link: "", thumbnail: "", duration: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("https://node-api-fvge.onrender.com/videos", form);
    router.push("/");
  };

  return (
    <FormContainer>
      <h1>Criar Novo Vídeo</h1>
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Título" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Input type="text" placeholder="Descrição" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Input type="text" placeholder="Link do vídeo" onChange={(e) => setForm({ ...form, link: e.target.value })} />
        <Input type="text" placeholder="Imagem Thumbnail" onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
        <Input type="number" placeholder="Duração (segundos)" onChange={(e) => setForm({ ...form, duration: e.target.value })} />
        <Button type="submit">Criar</Button>
      </form>
    </FormContainer>
  );
}

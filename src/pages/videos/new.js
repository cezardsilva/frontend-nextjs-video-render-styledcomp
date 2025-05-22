import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreateVideo() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", link: "", thumbnail: "", duration: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("https://node-api-fvge.onrender.com/videos", form);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar Novo Vídeo</h1>
      <input type="text" placeholder="Título" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input type="text" placeholder="Descrição" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input type="text" placeholder="Link" onChange={(e) => setForm({ ...form, link: e.target.value })} />
      <input type="text" placeholder="Thumbnail" onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
      <input type="number" placeholder="Duração" onChange={(e) => setForm({ ...form, duration: e.target.value })} />
      <button type="submit">Criar</button>
    </form>
  );
}

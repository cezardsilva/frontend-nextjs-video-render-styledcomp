import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("https://node-api-fvge.onrender.com/videos");
        console.log("Dados recebidos:", response.data); // 👀 Verifique no console se os dados aparecem
        setVideos(response.data);
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error.message);
      }
    };

    fetchVideos();
  }, []);

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Tem certeza que deseja excluir este vídeo?");
  
  if (!confirmDelete) return;

  try {
    await axios.delete(`https://node-api-fvge.onrender.com/videos/${id}`);
    
    // Atualizando o estado sem recarregar a página
    setVideos(prevVideos => prevVideos.filter(video => video.id !== id));
    
    alert("Vídeo excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar vídeo:", error.message);
    alert("Erro ao excluir vídeo. Tente novamente.");
  }
};


  return (
    <div>
      <h1>Lista de Vídeos</h1>
      <a href="/videos/new">➕ Adicionar Vídeo</a>
      <ul>
        {videos.length === 0 ? (
          <p>Nenhum vídeo encontrado...</p>
        ) : (
          videos.map(video => (
            <li key={video.id}>
              <h2>{video.title}</h2>
              <p>{video.description}</p>
              <a href={video.link}>Assistir no YouTube</a>
              <img src={video.thumbnail} alt={video.title} />
              <p>Duração: {video.duration} segundos</p>
              <button onClick={() => handleDelete(video.id)}>🗑 Deletar</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

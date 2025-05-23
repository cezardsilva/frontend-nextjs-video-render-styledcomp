import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

const VideoList = styled.ul`
  margin-top: 20px;
`;

const VideoItem = styled.li`
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("https://node-api-fvge.onrender.com/videos");
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
      setVideos(prevVideos => prevVideos.filter(video => video.id !== id));
      alert("Vídeo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar vídeo:", error.message);
      alert("Erro ao excluir vídeo. Tente novamente.");
    }
  };

  return (
    <Container>
      <h1>Lista de Vídeos</h1>
      <a href="/videos/new">➕ Adicionar Vídeo</a>
      <VideoList>
        {videos.length === 0 ? (
          <p>Nenhum vídeo encontrado...</p>
        ) : (
          videos.map(video => (
            <VideoItem key={video.id}>
              <h2>{video.title}</h2>
              <p>{video.description}</p>
              <a href={video.link}>Assistir no YouTube</a>
              <img src={video.thumbnail} alt={video.title} />
              <p>Duração: {video.duration} segundos</p>
              <DeleteButton onClick={() => handleDelete(video.id)}>🗑 Deletar</DeleteButton>
            </VideoItem>
          ))
        )}
      </VideoList>
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle.js";

const Container = styled.div`
  margin: auto;
  
  h1 {
    text-align: center;
    color: #ffffff;
    font-size: 2rem;
  }
`;

const AddVideoLink = styled.a`
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

const VideoList = styled.ul`
  margin-top: 20px;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
`;


const VideoItem = styled.li`
  background: rgb(58, 58, 58);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    color:rgb(255, 255, 255);
  }

  .desc {
    color: rgb(243, 237, 156);
  }

  a {
    margin-top: 5px;
  }

  img {
    width: 80%;
    max-width: 400px;
    margin: 20px 0px 20px 0px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap; /* Isso ajuda se os botões forem grandes */
`;


const Button = styled.button`
  background: ${({ primary }) => (primary ? "rgb(35, 200, 98)" : "#c82333")};
  color: white;
  border: none;
  width: 200px;
  height: 50px; /* Corrigindo aqui! */
  padding: 5px;  
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background: ${({ primary }) => (primary ? "rgb(37, 102, 62)" : "rgb(129, 1, 14)")};
  }
`;

const Input = styled.input`
  width: 350px;
`;

const EditContainer = styled.div`
  display: grid;
  grid-template-columns: 120px 280px;
  span {
    text-align: left;
  }
`;

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [editVideo, setEditVideo] = useState({ id: null, title: "", description: "", link: "", thumbnail: "", duration: 0 });


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

  const handleUpdate = async () => {
    if (!editVideo.id) return;

    try {
      await axios.put(`https://node-api-fvge.onrender.com/videos/${editVideo.id}`, {  // ID adicionado na URL!
        title: editVideo.title,
        description: editVideo.description,
        link: editVideo.link,
        thumbnail: editVideo.thumbnail,
        duration: editVideo.duration
      });

      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.id === editVideo.id
            ? { ...video, title: editVideo.title, description: editVideo.description }
            : video
        )
      );

      setEditVideo({ id: null, title: "", description: "" });
      alert("Vídeo atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar vídeo:", error.message);
      alert("Erro ao atualizar vídeo. Tente novamente.");
    }
  };

  const handleEdit = (video) => {
    setEditVideo({
      id: video.id,
      title: video.title,
      description: video.description,
      link: video.link,
      thumbnail: video.thumbnail,
      duration: video.duration
    });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <h1>Lista de Vídeos</h1>
        <AddVideoLink href="/videos/new">➕ Adicionar Vídeo</AddVideoLink>
        <VideoList>
          {videos.length === 0 ? (
            <p>Nenhum vídeo encontrado...</p>
          ) : (
            videos.map((video) => (
              <VideoItem key={video.id}>
                {editVideo.id === video.id ? (
                  <>
                    <EditContainer>
                      <span>Título</span><Input
                        type="text"
                        value={editVideo.title}
                        onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
                      />
                    </EditContainer>
                    <EditContainer>
                      <span>Descrição: </span><Input
                        type="text"
                        value={editVideo.description}
                        onChange={(e) => setEditVideo({ ...editVideo, description: e.target.value })}
                      />
                    </EditContainer>
                    <EditContainer>
                      <span>Link: </span><Input
                        type="text"
                        value={editVideo.link}
                        onChange={(e) => setEditVideo({ ...editVideo, link: e.target.value })}
                      />
                    </EditContainer>
                    <EditContainer>
                      <span>Thumbnail: </span><Input
                        type="text"
                        value={editVideo.thumbnail}
                        onChange={(e) => setEditVideo({ ...editVideo, thumbnail: e.target.value })}
                      />
                    </EditContainer>
                    <EditContainer>
                      <span>Duração(seg): </span><Input
                        type="text"
                        value={editVideo.duration}
                        onChange={(e) => setEditVideo({ ...editVideo, duration: e.target.value })}
                      />
                    </EditContainer>
                <Button onClick={handleUpdate}>Salvar Alterações</Button>
              </>
            ) : (
          <>
            <h2>{video.title}</h2>
            <p className="desc">{video.description}</p>
            <img src={video.thumbnail} alt={video.title} />
            <p>Duração: {video.duration} segundos</p>
            <ButtonContainer>
              <Button primary onClick={() => handleDelete(video.id)}>🗑 Deletar</Button>
              <Button onClick={() => window.open(video.link, "_blank")}>Assistir no YouTube</Button>
              <Button onClick={() => handleEdit(video)}>✏️ Editar</Button>
            </ButtonContainer>
          </>
                )}
        </VideoItem>
        ))
          )}
      </VideoList>
    </Container >
    </>
  );
}

import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
        setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "NOVO PROJETO",
      url: "Teste",
      techs: [
        "Node.js",
        "Laravel"
      ]
    })

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      const index = repositories.indexOf(repository => repository.id === id);
      repositories.splice(index, 1);
      setRepositories([...repositories]);
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <>
              <li key={Date.now()}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            </>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-edc.png';

export default function Home() {
  const [imagem, setImagem] = useState(null); 

  const uploadImage = async (e) => {
    e.preventDefault();
    console.log("Upload Imagem:", imagem);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagem(URL.createObjectURL(file));
    console.log(imagem);
  };

  return (
    <div className="container">
      <header className="home-header">
        <img src={logo} alt="" />
      </header>

      <div className="home-corpo">
        <div className='escrita-corpo'>
          <h1>Seja Bem-Vindo</h1>
        </div>

        <div className='opcoes-corpo'>
          <button><Link className='link-style' to='/'>Listagem</Link></button>
          <button><Link className='link-style' to='/cadastrar'>Cadastrar</Link></button>
          <button><Link className='link-style' to='/addCurso'>Adicionar Curso</Link></button>
        </div>

        
        <form onSubmit={uploadImage}>
          <label htmlFor="image">Imagem:</label>
          <input type="file" id="image" name="image" onChange={handleFileChange} />
          <button type="submit">Salvar</button>
        </form>

        {imagem && (
          <div>
            <h2>Imagem:</h2>
            <img src={imagem} alt="Imagem carregada" style={{ maxWidth: '100%' }} />
          </div>
        )}
      </div>
    </div>
  );
}

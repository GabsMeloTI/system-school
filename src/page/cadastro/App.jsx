import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-edc.png';
import defaultImage from '../../assets/img/addFoto.png'
import './App.css';



export default function Home() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
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
        <img src={logo} alt="Logo" />
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

        <p>Dados do Aluno</p>
        <form onSubmit={uploadImage} className='formulario'>
          <div className='input-aluno'>
            <div className='input'>
              <label htmlFor="nome">Nome:</label>
              <input 
                type="text" 
                id="nome" 
                name="nome" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
              />
            </div>
            <div className='input'>
              <label htmlFor="dataNascimento">Data de Nascimento:</label>
              <input 
                type="date" 
                id="dataNascimento" 
                name="dataNascimento" 
                value={dataNascimento} 
                onChange={(e) => setDataNascimento(e.target.value)} 
              />
            </div>
            <div className='input'>
              <label htmlFor="email">Email:</label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className='input'>
              <label htmlFor="telefone">Telefone:</label>
              <input 
                type="text" 
                id="telefone" 
                name="telefone" 
                value={telefone} 
                onChange={(e) => setTelefone(e.target.value)} 
              />
            </div>
            <div className='input'>
              <label htmlFor="tipo">Tipo:</label>
              <input 
                type="text" 
                id="tipo" 
                name="tipo" 
                value={tipo} 
                onChange={(e) => setTipo(e.target.value)} 
              />
            </div>
            <div className='input'>
              <label htmlFor="cep">CEP:</label>
              <input 
                type="text" 
                id="cep" 
                name="cep" 
                value={cep} 
                onChange={(e) => setCep(e.target.value)} 
              />
            </div>
          </div>

          <div className='input-aluno'>
            <div className='input'>
              <label htmlFor="cidade">Cidade:</label>
              <input 
                type="text" 
                id="cidade" 
                name="cidade" 
                value={cidade} 
                onChange={(e) => setCidade(e.target.value)} 
              />
            </div>
            <div className='input'>
              <label htmlFor="estado">Estado:</label>
              <input 
                type="text" 
                id="estado" 
                name="estado" 
                value={estado} 
                onChange={(e) => setEstado(e.target.value)} 
              />
            </div>
            <div className='input'>
              <label htmlFor="bairro">Bairro:</label>
              <input 
                type="text" 
                id="bairro" 
                name="bairro" 
                value={bairro} 
                onChange={(e) => setBairro(e.target.value)} 
              />
            </div>
            <div className='input'>
              <label htmlFor="rua">Rua:</label>
              <input 
                type="text" 
                id="rua" 
                name="rua" 
                value={rua} 
                onChange={(e) => setRua(e.target.value)} 
              />
            </div>
            <div className='input'>
              <label htmlFor="numero">Número:</label>
              <input 
                type="text" 
                id="numero" 
                name="numero" 
                value={numero} 
                onChange={(e) => setNumero(e.target.value)} 
              />
            </div>
            <div className='input'>
              <label htmlFor="complemento">Complemento:</label>
              <input 
                type="text" 
                id="complemento" 
                name="complemento" 
                value={complemento} 
                onChange={(e) => setComplemento(e.target.value)} 
              />
            </div>
          </div>

          <div className='input-imagem'>
            <label htmlFor="imagem">Foto:</label>
            <label className='custom-file-upload'>
              <input type="file" id="imagem" name="imagem" onChange={handleFileChange} />
              Escolher arquivo
            </label>
            <div>
              <img 
                className="uploaded-image" 
                src={imagem || defaultImage} 
                alt="Imagem carregada" 
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

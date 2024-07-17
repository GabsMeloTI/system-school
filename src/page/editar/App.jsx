import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-edc.png';
import defaultImage from '../../assets/img/addFoto.png';
import './App.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export default function Editar() {
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState("2024-07-01");
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
  const [cursos, setCursos] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [alterar, setAlterar] = useState(false);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get('/curso');
        setCursos(Array.isArray(response.data.content) ? response.data.content : []);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  const handleCursoChange = (e) => {
    setCursoSelecionado(e.target.value);
  };

  const uploadImage = async (e) => {
    e.preventDefault();

    if (cursoSelecionado === '') {
      alert('Por favor, selecione um curso.');
      return;
    }

    const contatoData = {
      telefone,
      email,
      tipo,
    };
    console.log(contatoData);

    try {
      const contatoResponse = await api.post('/contato', contatoData);
      const contatoId = contatoResponse.data.codigo;

      const enderecoData = {
        cep,
        cidade,
        estado,
        bairro,
        rua,
        numero,
        complemento,
      };

      const enderecoResponse = await api.post('/endereco', enderecoData);
      const enderecoId = enderecoResponse.data.codigo;

      const alunoData = {
        nome,
        nascimento,
        foto: imagem,
        contatoId,
        enderecoId,
      };

      const alunoResponse = await api.post('/aluno', alunoData);
      const alunoId = alunoResponse.data.codigo;
      console.log(cursoSelecionado);

      await api.post(`/aluno/${alunoId}/curso/${cursoSelecionado}`);

      console.log('Aluno cadastrado com sucesso!');
      alert('Aluno cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagem(URL.createObjectURL(file));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/aluno');
        if (Array.isArray(response.data.content)) {
          setAlunos(response.data.content);
        } else {
          console.error('Dados retornados não são um array:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar aluno: ', error);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (aluno) => {
    setNome(aluno.nome);
    setNascimento(aluno.nascimento);
    setEmail(aluno.contato ? aluno.contato.email : '');
    setTelefone(aluno.contato ? aluno.contato.telefone : '');
    setTipo(aluno.contato ? aluno.contato.tipo : '');
    setCep(aluno.endereco ? aluno.endereco.cep : '');
    setCidade(aluno.endereco ? aluno.endereco.cidade : '');
    setEstado(aluno.endereco ? aluno.endereco.estado : '');
    setBairro(aluno.endereco ? aluno.endereco.bairro : '');
    setRua(aluno.endereco ? aluno.endereco.rua : '');
    setNumero(aluno.endereco ? aluno.endereco.numero : '');
    setComplemento(aluno.endereco ? aluno.endereco.complemento : '');
    setImagem(aluno.foto ? aluno.foto : null);
    setCursoSelecionado(aluno.curso ? aluno.curso.codigo : '');
    setAlterar(true);
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
        {alunos.map(aluno => (
          <div key={aluno.codigo}>
            <button onClick={() => handleEdit(aluno)}>Editar</button>
          </div>
        ))}

        <form onSubmit={uploadImage} className='formulario'>
          <div className='divisao'>
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
                  value={nascimento}
                  onChange={(e) => setNascimento(e.target.value)}
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
          </div>
          <div className='botaoEselect'>
            <label htmlFor="cursos">Cursos:</label>
            <select name="curso" id="curso" onChange={handleCursoChange} value={cursoSelecionado}>
              <option value="">Selecione um curso</option>
              {Array.isArray(cursos) && cursos.map((curso) => (
                <option key={curso.codigo} value={curso.codigo}>{curso.nome}</option>
              ))}
            </select>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

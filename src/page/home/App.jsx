import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importe corretamente o Link
import logo from '../../assets/img/logo-edc.png'
import excluir from '../../assets/img/excluir.png'
import editar from '../../assets/img/botao-editar.png'
import seta from '../../assets/img/seta.png'
import filtro from '../../assets/img/filtro.png'

import axios from 'axios';

const api = axios.create({
    baseURL: '/', 
});

export default function Home() {

  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/aluno');
        if (Array.isArray(response.data.content)) {
          setAlunos(response.data.content);
        } else {
          console.error('Dados retornados não são um array:', response.data);
        }
      } catch(error) {
        console.error('Erro ao buscar aluno: ', error);
        console.log(error);
      }
    };

    fetchData();
  }, [])

  const handleDelete = async(codigo) => {
    try {
      await api.delete(`/aluno/${codigo}`);
      alert("Aluno removido.")
      const response = await api.get('/aluno');
      setAlunos(response.data.content);
    } catch(error) {
      console.error('Erro ao excluir aluno: ', error);
    }
  }

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
        
        <div className='filtro'>
          <div className='filtro-txt'>
            <img src={filtro} alt="" />
            <p>FILTRAR POR:</p>
          </div>
          <select>
            <option value="">Escolha uma opção</option>
            <option value="opcao0">Z-A</option>
            <option value="opcao1">Z-A</option>
            <option value="opcao2">Data(Recentes)</option>
            <option value="opcao3">Data(Antigos)</option>
            <option value="opcao4">Data Nascimento</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Curso</th>
              <th>Contato</th>
              <th>Foto</th>
              <th>Editar</th>
              <th>Excluir</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          
          <tbody>
            {alunos.map(aluno => (
                <tr key={aluno.codigo}>
                  <td>{aluno.codigo}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.curso ? aluno.curso.nome : 'Sem curso'}</td>
                  <td>{aluno.contato ? aluno.contato.telefone : 'Sem contato'}</td>
                  <td className='foto'>
                    <img src={aluno.foto ? aluno.foto : 'https://via.placeholder.com/150'} alt={aluno.nome} />
                  </td>
                  <td className='icon'><img src={editar} alt="Editar" /></td>
                  <td className='icon' onClick={() => handleDelete(aluno.codigo)}><img src={excluir} alt="Excluir" /></td>
                  <td className='icon'><img src={seta} alt="Detalhes" /></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

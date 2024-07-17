import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-edc.png'
import seta from '../../assets/img/seta-esquerda.png'

import axios from 'axios';

const api = axios.create({
    baseURL: '/', 
});

export default function Detalhes() {

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

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
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
          <Link className='link-style' to='/'><img src={seta} alt="Detalhes" /></Link>
          <h1>Dados do Aluno</h1>
        </div>
        
          
        <div className='dados-aluno'>
          {alunos.map(aluno => (
              <div key={aluno.codigo}>
                <div className='nome-id'>
                  <h4>ID: {aluno.codigo}</h4>
                  <h1>Nome: {aluno.nome}</h1>
                </div>
                <div className='outros-dados'>
                  <div>
                    <p><b>Data de Nascimento:</b> {formatDate(aluno.nascimento)}</p>
                    <p><b>Idade:</b> {calculateAge(aluno.nascimento)}</p>
                    <p><b>Curso:</b> {aluno.curso ? aluno.curso.nome : 'Sem curso'}</p>
                    <p><b>Tipo de Contato:</b> {aluno.contato ? aluno.contato.tipo : 'Sem contato'}</p>
                    <p><b>Telefone:</b> {aluno.contato ? aluno.contato.telefone : 'Sem contato'}</p>
                    <p><b>E-mail:</b> {aluno.contato ? aluno.contato.email : 'Sem contato'}</p>
                    <p><b>Status:</b> Ativo</p>
                  </div>
                  <div>
                    <p><b>CEP:</b> {aluno.endereco ? aluno.endereco.cep : 'Sem contato'}</p>          
                    <p><b>Cidade:</b> {aluno.endereco ? aluno.endereco.cidade : 'Sem contato'}</p>          
                    <p><b>Estado:</b> {aluno.endereco ? aluno.endereco.estado : 'Sem contato'}</p>          
                    <p><b>Bairro:</b> {aluno.endereco ? aluno.endereco.bairro : 'Sem contato'}</p>          
                    <p><b>Rua:</b> {aluno.endereco ? aluno.endereco.rua : 'Sem contato'}</p>          
                    <p><b>Número:</b> {aluno.endereco ? aluno.endereco.numero : 'Sem contato'}</p>          
                    <p><b>Complemento: </b>{aluno.endereco ? aluno.endereco.complemento : 'Sem contato'}</p>          
                  </div>
                  <div className='foto'>
                    <img src={aluno.foto ? aluno.foto : 'https://via.placeholder.com/150'} alt={aluno.nome} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

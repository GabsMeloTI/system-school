import './App.css';
import React from 'react';
import { Link } from 'react-router-dom'; // Importe corretamente o Link
import logo from '../../assets/img/logo-edc.png'
import excluir from '../../assets/img/excluir.png'
import editar from '../../assets/img/botao-editar.png'
import seta from '../../assets/img/seta.png'
import filtro from '../../assets/img/filtro.png'

export default function Home() {
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
              <tr>
                <td>01</td>
                <td>Gabriel Melo</td>
                <td>ADS</td>
                <td>(11) 980201892</td>
                <td className='foto'><img  src="https://media-gru1-1.cdn.whatsapp.net/v/t61.24694-24/429984930_1410278129592123_3912362239692716687_n.jpg?ccb=11-4&oh=01_Q5AaIJxFqv4YKcud7UT6eqvaa7bLU7akY9ifr3Yg4PsWWYRc&oe=668BF794&_nc_sid=e6ed6c&_nc_cat=109" alt="" /></td>
                <td className='icon'><img src={editar} alt="" /></td>
                <td className='icon'><img src={excluir} alt="" /></td>
                <td className='icon'><img src={seta} alt="" /></td>
              </tr>
              <tr>
                <td>02</td>
                <td>Elder Bispo</td>
                <td>ADM</td>
                <td>(11) 980201890</td>
                <td className='foto'><img  src="https://media-gru1-1.cdn.whatsapp.net/v/t61.24694-24/172381740_143059721018358_820305966838350501_n.jpg?ccb=11-4&oh=01_Q5AaIGCc4-9d7SZxIkWUKC5eUZb4Fm-XFOvl8VGTzmFUq9He&oe=66928045&_nc_sid=e6ed6c&_nc_cat=108" alt="" /></td>
                <td className='icon'><img src={editar} alt="" /></td>
                <td className='icon'><img src={excluir} alt="" /></td>
                <td className='icon'><img src={seta} alt="" /></td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

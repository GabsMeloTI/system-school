import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/home/App.jsx';
import Cadastrar from './page/cadastro/App.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/cadastrar" Component={Cadastrar} />
      </Routes>
    </Router>
  );
};

export default App;

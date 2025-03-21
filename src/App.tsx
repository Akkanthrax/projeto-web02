import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import ListaUsuario from './pages/ListaUsuario'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/usuarios" element={<ListaUsuario />} />
          </Routes>
          
        </main>
        <Footer />
      </div>
    </BrowserRouter >
  )
}

export default App;

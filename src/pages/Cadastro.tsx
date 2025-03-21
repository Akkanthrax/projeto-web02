"use client"

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
//import { addUsuario } from "../../api";

function Register() {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true)
        try {
            const usuario = {
                nome, sobrenome, email, telefone, login, senha
            }
            //await addUsuario(usuario)
        } catch (error) {
            console.log("Erro ao adicionar o usuário", error)
            setIsSubmitting(false)
        }
        navigate(`/usuarios`, {
             state: { nome, sobrenome, email, telefone, login, senha }
        });
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-blue-300">
            <h1 className="text-4xl mb-6 font-bold text-center text-white">
                CADASTRE-SE
            </h1>
            <p className="mt-4 text-2xl text-center text-white">
                Faça seu cadastro
            </p>
            <form className="mt-4 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                    <input type="text" placeholder="Digite seu Nome" className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input type="text" placeholder="Digite seu Sobrenome" className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)}/>
                    <input type="email" placeholder="Digite seu E-mail" className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="number" placeholder="Digite seu Telefone" className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                    <input type="text" placeholder="Digite seu Nome de Usuário" className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={login} onChange={(e) => setLogin(e.target.value)}/>
                    <input type="password" placeholder="Digite sua Senha" className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={senha} onChange={(e) => setSenha(e.target.value)}/>

                    <div className="flex space-x-4">
                        <Link to="/" className="w-full p-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-300 text-center">
                            Voltar
                        </Link>

                        <button className="w-full p-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300" type="submit"  disabled={isSubmitting}>
                            {isSubmitting ? "Cadastrando .... " : "Cadastrar"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;

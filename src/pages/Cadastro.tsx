"use client"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// Mock API function for the example
const addUsuario = async (userData: any) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("User data submitted:", userData)
      resolve(userData)
    }, 1000)
  })
}

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  sobrenome: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
  login: yup.string().min(3, "Login deve ter no mínimo 3 caracteres").required("Login é obrigatório"),
  senha: yup.string().min(3, "Senha deve ter no mínimo 3 caracteres").required("Senha é obrigatória"),
  confirmaSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas devem ser iguais")
    .required("A confirmação de senha é obrigatória"),
})

// Função para formatar o telefone manualmente
const formatPhone = (value: string) => {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, "")

  // Aplica a formatação (99) 99999-9999
  if (numbers.length <= 2) {
    return `(${numbers}`
  } else if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  } else if (numbers.length <= 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  } else {
    // Limita a 11 dígitos (DDD + 9 dígitos)
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }
}

const Cadastro = () => {
  const navigate = useNavigate()
  const [phoneValue, setPhoneValue] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Registra o telefone no formulário quando ele muda
  React.useEffect(() => {
    setValue("telefone", phoneValue)
  }, [phoneValue, setValue])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhone(e.target.value)
    setPhoneValue(formattedValue)
  }

  const onSubmit = async (data: any) => {
    try {
      const { confirmaSenha, ...userData } = data
      await addUsuario(userData)
      alert("Usuário cadastrado com sucesso!")
      reset()
      setPhoneValue("")
      navigate("/users")
    } catch (error) {
      alert("Erro ao cadastrar usuário")
      console.error(error)
    }
  }

  return (
    <div className="h-screen mb-20 flex flex-col items-center justify-center bg-blue-300">
      <h1 className="text-4xl mb-6 font-bold text-center text-white">CADASTRE-SE</h1>
      <div className="mt-2 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto bg-blue-700">
        <p className="text-2xl text-center text-white">Faça seu cadastro</p>
      </div>
      <form
        className="mt-4 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-4 bg-white">
          <input
            type="text"
            {...register("nome")}
            placeholder="Digite seu Nome"
            className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}

          <input
            type="text"
            {...register("sobrenome")}
            placeholder="Digite seu Sobrenome"
            className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.sobrenome && <p className="mt-1 text-sm text-red-600">{errors.sobrenome.message}</p>}

          <input
            type="email"
            {...register("email")}
            placeholder="Digite seu E-mail"
            className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}

          {/* Input de telefone com formatação manual */}
          <input
            type="text"
            value={phoneValue}
            onChange={handlePhoneChange}
            placeholder="Digite seu Telefone"
            className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={15} // (99) 99999-9999
          />
          {errors.telefone && <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>}

          <input
            type="text"
            {...register("login")}
            placeholder="Digite seu Nome de Usuário"
            className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.login && <p className="mt-1 text-sm text-red-600">{errors.login.message}</p>}

          <input
            type="password"
            {...register("senha")}
            placeholder="Digite sua Senha"
            className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.senha && <p className="mt-1 text-sm text-red-600">{errors.senha.message}</p>}

          <input
            type="password"
            {...register("confirmaSenha")}
            placeholder="Confirme sua Senha"
            className="p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmaSenha && <p className="mt-1 text-sm text-red-600">{errors.confirmaSenha.message}</p>}

          <div className="flex space-x-4">
            <Link
              to="/"
              className="w-full p-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-300 text-center"
            >
              Voltar
            </Link>

            <button
              className="w-full p-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Cadastro


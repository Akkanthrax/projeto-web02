import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario, updateUsuario, type Usuario } from "../../api";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';

import InputMask from "react-input-mask";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

// Esquema de validação com Yup
const schema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  sobrenome: yup.string().required("O sobrenome é obrigatório"),
  email: yup.string().required("O e-mail é obrigatório").email("Digite um e-mail válido"),
  telefone: yup.string().required("O telefone é obrigatório").min(11, "Número inválido"),
  login: yup.string().required("O nome de usuário é obrigatório").min(3, "Mínimo de 3 caracteres"),
  senha: yup.string().required("A senha é obrigatória").min(3, "Mínimo de 3 caracteres"),
});

function ListaUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Hook do react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.log("Erro ao buscar os usuários", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id: string | number | undefined) => {
    if (!id) return;
    const result = await Swal.fire({
      title: "Tem certeza que deseja excluir?",
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Não, cancelar"
    });
    if (result.isConfirmed) {
      try {
        await deleteUsuario(id);
        setUsuarios(prev => prev.filter(user => user.id !== id));
        Swal.fire("Excluído", "O usuário foi removido com sucesso", "success");
      } catch (error) {
        console.log("Erro ao excluir o usuário", error);
        Swal.fire("Erro!", "Não foi possível remover o usuário", "error");
      }
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingId(usuario.id || null);
  };

  const handleSave = async (data: any) => {
    if (!editingId) return;
    try {
      setIsUpdating(true);
      await updateUsuario(editingId, data);
      setUsuarios(prev => prev.map(user => user.id === editingId ? { ...user, ...data } : user));
      setEditingId(null);
    } catch (error) {
      console.log("Erro ao atualizar o usuário", error);
      Swal.fire("Erro!", "Não foi possível atualizar o usuário", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-300">
      <h1 className="text-3xl font-bold text-center text-white">
        LISTA DE USUÁRIOS CADASTRADOS
      </h1>
      {loading ? (
        <p className="text-white">Carregando usuários...</p>
      ) : usuarios.length === 0 ? (
        <p className="text-white">Nenhum usuário cadastrado</p>
      ) : (
        <form onSubmit={handleSubmit(handleSave)}>
          <table className="w-full">
            <thead className="bg-white">
              <tr>
                <th className="border px-2 py-2 text-left">Nome</th>
                <th className="px-2 py-2 text-left">Sobrenome</th>
                <th className="px-2 py-2 text-left">Email</th>
                <th className="px-2 py-2 text-left">Telefone</th>
                <th className="px-2 py-2 text-left">Login</th>
                <th className="px-2 py-2 text-left">Senha</th>
                <th className="px-2 py-2 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="px-2">
                    {editingId === usuario.id ? (
                      <>
                        <input {...register("nome")} defaultValue={usuario.nome} className="p-2 border border-gray-300" />
                        <p className="text-red-500 text-sm">{errors.nome?.message}</p>
                      </>
                    ) : usuario.nome}
                  </td>
                  <td className="px-2">
                    {editingId === usuario.id ? (
                      <>
                        <input {...register("sobrenome")} defaultValue={usuario.sobrenome} className="p-2 border border-gray-300" />
                        <p className="text-red-500 text-sm">{errors.sobrenome?.message}</p>
                      </>
                    ) : usuario.sobrenome}
                  </td>
                  <td className="px-2">
                    {editingId === usuario.id ? (
                      <>
                        <input {...register("email")} defaultValue={usuario.email} className="p-2 border border-gray-300" />
                        <p className="text-red-500 text-sm">{errors.email?.message}</p>
                      </>
                    ) : usuario.email}
                  </td>
                  <td className="px-2">
                    {editingId === usuario.id ? (
                      <>
                        <InputMask mask="(99) 99999-9999" {...register("telefone")} defaultValue={usuario.telefone} className="p-2 border border-gray-300" />
                        <p className="text-red-500 text-sm">{errors.telefone?.message}</p>
                      </>
                    ) : usuario.telefone}
                  </td>
                  <td className="px-2">
                    {editingId === usuario.id ? (
                      <>
                        <input {...register("login")} defaultValue={usuario.login} className="p-2 border border-gray-300" />
                        <p className="text-red-500 text-sm">{errors.login?.message}</p>
                      </>
                    ) : usuario.login}
                  </td>
                  <td className="px-2">
                    {editingId === usuario.id ? (
                      <>
                        <input {...register("senha")} defaultValue={usuario.senha} className="p-2 border border-gray-300" />
                        <p className="text-red-500 text-sm">{errors.senha?.message}</p>
                      </>
                    ) : usuario.senha}
                  </td>
                  <td className="px-2 text-center flex justify-center gap-3">
                    {editingId === usuario.id ? (
                      <>
                        <button type="submit" disabled={isUpdating}>
                          <FaSave />
                          <span>Salvar</span>
                        </button>
                        <button onClick={handleCancel}>
                          <FaTimes />
                          <span>Cancelar</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(usuario)}>
                          <FaEdit />
                          <span>Editar</span>
                        </button>
                        <button onClick={() => handleDelete(usuario.id)}>
                          <FaTrash className="text-red-500" />
                          <span>Excluir</span>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      )}
    </div>
  );
}

export default ListaUsuario;

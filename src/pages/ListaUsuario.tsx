import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario, updateUsuario, type Usuario } from "../../api";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';



function ListaUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editedUser, setEditedUser] = useState<Usuario | null>(null)
  const [isUpdating, setIsUpdating] = useState(false);

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
    setEditedUser({ ...usuario })
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!editedUser) return;
    const {name, value} = e.target
    setEditedUser(prev => ({
      ...prev!,
      [name]: value
    }))
  }

  const handleSave = async () => {
    if(!editedUser || !editingId) return;
    try{
      setIsUpdating(true)
      await updateUsuario(editingId, editedUser)
      setUsuarios(prev => prev.map(user => user.id === editingId ? editedUser : user))
      setEditingId(null)
      setEditedUser(null)
    }catch(error){
      console.log("Erro ao atualizar o usuário", error)
      Swal.fire("Erro!", "Não foi possivel atualizar o usuário", "error")

    }finally{
      setIsUpdating(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditedUser(null)
  }

  const renderInputField = (fieldName: keyof Usuario, value: string) => {
    return(
      <input type="text" name={fieldName} value={value} onChange={handleChanges} className="p-2"/>
    )
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-300 p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        LISTA DE USUÁRIOS
      </h1>
      {loading ? (
        <p className="text-white text-lg">Carregando usuários...</p>
      ) : usuarios.length === 0 ? (
        <p className="text-white text-lg">Nenhum usuário cadastrado</p>
      ) : (
        <div className="w-full max-w-10xl bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-3">Nome</th>
                <th className="p-3">Sobrenome</th>
                <th className="p-3">Email</th>
                <th className="p-3">Telefone</th>
                <th className="p-3">Login</th>
                <th className="p-3">Senha</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="odd:bg-gray-100 even:bg-gray-200">
                  <td className="p-3">
                    {editingId === usuario.id ? renderInputField("nome", editedUser?.nome || "") : usuario.nome}
                  </td>
                  <td className="p-3">
                    {editingId === usuario.id ? renderInputField("sobrenome", editedUser?.sobrenome || "") : usuario.sobrenome}
                  </td>
                  <td className="p-3">
                    {editingId === usuario.id ? renderInputField("email", editedUser?.email || "") : usuario.email}
                  </td>
                  <td className="p-3">
                    {editingId === usuario.id ? renderInputField("telefone", editedUser?.telefone || "") : usuario.telefone}
                  </td>
                  <td className="p-3">
                    {editingId === usuario.id ? renderInputField("login", editedUser?.login || "") : usuario.login}
                  </td>
                  <td className="p-3">
                    {editingId === usuario.id ? renderInputField("senha", editedUser?.senha || "") : "******"}
                  </td>
                  <td className="p-3 flex space-x-2 ">
                    {editingId === usuario.id ? (
                      <>
                        <button onClick={handleSave} disabled={isUpdating} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
                          <FaSave />
                        </button>
                        <button onClick={handleCancel} className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500">
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(usuario)} className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-500">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(usuario.id)} className="p-2 bg-red-700 text-white rounded-lg hover:bg-red-500">
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListaUsuario;

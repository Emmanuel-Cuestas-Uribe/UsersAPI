import React, { useState, useEffect } from 'react';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('https://3.145.101.190/api/usuarios', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data = await response.json();
      setUsuarios(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirm) {
      try {
        const response = await fetch(`https://3.145.101.190/api/usuario/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        if (!response.ok) {
          throw new Error('Error al eliminar usuario');
        }
        fetchUsuarios();  // Refrescar la lista después de eliminar
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">Usuarios Registrados</h1>
      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && usuarios.length === 0 && (
        <p className="text-gray-500">No hay usuarios disponibles.</p>
      )}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{usuario.id}</td>
                <td className="px-4 py-2">{usuario.username}</td>
                <td className="px-4 py-2">{usuario.email}</td>
                <td className="px-4 py-2 flex justify-between">
                  <button
                    onClick={() => handleEliminar(usuario.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;

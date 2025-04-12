import { useState } from 'react';

const Registro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Usuario registrado con éxito');
    } else {
      alert(data.mensaje);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form className="w-96 p-6 border rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-center text-lg mb-4">Registrar nuevo usuario</h2>
        <div className="mb-4">
          <label className="block text-sm">Nombre de usuario</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Correo electrónico</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;

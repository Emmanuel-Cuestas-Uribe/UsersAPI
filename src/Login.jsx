import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://3.145.101.190/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.access_token);
      onLogin();
    } else {
      alert(data.mensaje);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form className="w-96 p-6 border rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-center text-lg mb-4">Iniciar sesión</h2>
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
          <label className="block text-sm">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;

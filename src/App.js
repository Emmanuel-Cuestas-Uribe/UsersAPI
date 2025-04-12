import { useState } from 'react';
import Login from './Login';
import Registro from './Registro';
import Usuarios from './Usuarios'; // ✅ correcto

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App bg-gray-100 text-black">
      <nav className="p-4 bg-white shadow-md flex justify-between">
        <h1 className="text-xl font-medium">App de Usuarios</h1>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">
              Cerrar sesión
            </button>
          ) : (
            <button onClick={() => setIsLoggedIn(false)} className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>

      <div className="flex justify-center items-center min-h-screen">
        {!isLoggedIn ? (
          <div className="space-y-6">
            <Login onLogin={handleLogin} />
            <Registro />
          </div>
        ) : (
          <Usuarios />
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './http/api';
import Snackbar from './components/Snackbar';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await api.post('/login', {
        email: username,
        senha: password,
      });
      const { data, status } = response;

      if (status > 199 && status <= 299 && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate('/home');
      } else {
        setSnackbar({
          message: 'Erro no login. Verifique suas credenciais.',
          type: 'error',
          duration: 10000,
        });
      }
    } catch (error) {
      setSnackbar({
        message: 'Erro na requisição. Tente novamente mais tarde.',
        type: 'error',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={login}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Logar
        </button>
      </div>
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ message: '', type: '' })}
      />
    </div>
  );
}

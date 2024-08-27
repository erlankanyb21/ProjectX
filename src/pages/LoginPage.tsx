import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const API_URL = 'https://projectxb.onrender.com/api/token/';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, { username, password });
      const { access, refresh } = response.data;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      console.log('Успешная авторизация!');
      console.log(access, refresh);
      navigateToHome();
      setError(null);
    } catch (err) {
      setError('');
      setTimeout(() => setError('Ошибка авторизации. Проверьте логин и пароль.'), 10);
      console.error('Ошибка авторизации:', err);
      console.log(username, password);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Добро пожаловать</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="username" className="form-label">Имя пользователя</label>
            <span className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 9a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-7 7a7 7 0 0 1 14 0H1z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="password" className="form-label">Пароль</label>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Войти
        </button>
      </form>
    </div>
  );
};
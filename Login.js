import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Импортируем CSS для стилей

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Статус авторизации
  const [user, setUser] = useState(null); // Логин пользователя
  const navigate = useNavigate(); // Инициализируем useNavigate

  // Функция для входа
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost/marketplace/api/login.php', {
        username,
        password,
      });

      console.log('Server response:', response.data); // Логируем ответ от сервера

      // Проверяем успешность авторизации
      if (response.data.status === 'Login successful') {
        // Сохраняем логин пользователя
        setUser(username);
        setIsLoggedIn(true); // Пользователь авторизован

        // Печатаем информацию о редиректе
        console.log('Redirecting to /cart');

        // Редирект на корзину
        navigate('/cart');
      } else {
        setErrorMessage(response.data.message || 'Неверное имя пользователя или пароль');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Ошибка при авторизации. Попробуйте снова.');
    }
  };

  // Функция для выхода
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login'); // Перенаправляем на страницу входа
  };

  return (
    <div className="login-container">
      <h2>{isLoggedIn ? `Добро пожаловать, ${user}` : 'Вход'}</h2>

      {/* Показываем форму входа только если пользователь не авторизован */}
      {!isLoggedIn ? (
        <>
          {/* Отображение ошибки, если она есть */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button onClick={handleLogin} className="login-btn">Войти</button>
        </>
      ) : (
        // Если пользователь авторизован, показываем кнопку выхода
        <button onClick={handleLogout} className="logout-btn">Выйти</button>
      )}
    </div>
  );
}

export default Login;

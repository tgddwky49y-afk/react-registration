import React, { useState } from 'react';
import { validateRegistration } from './validation.js';

export default function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const validationError = validateRegistration(values);
    setError(validationError);
    setMessage('');
    if (validationError) return;
    setMessage('Форма заполнена верно! Это демоверсия: аккаунт не создаётся, данные не сохраняются.');
    form.reset();
  }

  return (
    <main className="card">
      <span className="badge">React + Vite</span>
      <h1>Регистрация</h1>
      <p>Учебная форма. Используй вымышленные данные и тестовый пароль.</p>
      <form onSubmit={handleSubmit} onChange={() => { setError(''); setMessage(''); }}>
        <label htmlFor="name">Имя</label>
        <input id="name" name="name" autoComplete="name" required maxLength={60} placeholder="Твоё имя" />
        <label htmlFor="email">Электронная почта</label>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="name@example.com" />
        <label htmlFor="password">Пароль</label>
        <input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} aria-describedby="password-hint" />
        <span id="password-hint" className="hint">Не менее 8 символов</span>
        <label htmlFor="confirmPassword">Повтори пароль</label>
        <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} maxLength={128} />
        {error && <p className="error" role="alert">{error}</p>}
        <button type="submit">Зарегистрироваться</button>
      </form>
      {message && <p className="success" role="status">{message}</p>}
    </main>
  );
}

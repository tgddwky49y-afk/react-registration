import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="card">
      <span className="badge">React + Vite</span>
      <h1>Первое приложение</h1>
      <p>Проект запущен. Нажми на кнопку, чтобы проверить работу React.</p>
      <button onClick={() => setCount(count + 1)}>Нажать</button>
      <p className="counter" aria-live="polite">Количество нажатий: {count}</p>
    </main>
  );
}

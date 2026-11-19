export function validateRegistration({ name, email, password, confirmPassword }) {
  if (!name || name.trim().length < 2) return 'Введи имя: минимум 2 символа.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Проверь адрес электронной почты.';
  if (!password || password.length < 8) return 'Пароль должен содержать минимум 8 символов.';
  if (password !== confirmPassword) return 'Пароли не совпадают.';
  return '';
}

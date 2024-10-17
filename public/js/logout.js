// public/js/logout.js

document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.querySelector('a[href="/logout"]');
  
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
  
      // Удаляем токен из localStorage
      localStorage.removeItem('token');
  
      // Перенаправляем на страницу входа
      window.location.href = '/login';
    });
  });
  
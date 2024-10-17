// public/js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.form');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Сохраняем JWT-токен в localStorage
          localStorage.setItem('token', data.token);
          // Перенаправляем на главную страницу
          window.location.href = '/';
        } else {
          alert(data.message || 'Ошибка авторизации');
        }
      } catch (error) {
        console.error('Ошибка при авторизации:', error);
      }
    });
  });
  
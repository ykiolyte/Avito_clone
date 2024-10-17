// public/js/register.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.form');
  
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Регистрация успешна! Теперь вы можете войти.');
          window.location.href = '/login';
        } else {
          alert(data.message || 'Ошибка при регистрации');
        }
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
      }
    });
  });

  
// public/js/profile.js

document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
  
    const profileForm = document.querySelector('form[action="/users/profile"]');
    profileForm.addEventListener('submit', updateProfile);
  
    const avatarForm = document.querySelector('form[action="/users/upload-avatar"]');
    avatarForm.addEventListener('submit', uploadAvatar);
  });
  
  // Функция для загрузки профиля пользователя
  async function loadProfile() {
    try {
      const response = await fetch('/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при загрузке профиля');
      }
  
      const user = await response.json();
  
      document.getElementById('username').textContent = user.username;
      document.getElementById('email').value = user.email;
      document.getElementById('phone').value = user.phone || '';
      document.getElementById('avatar').src = user.avatar || '/avatars/default.png';
    } catch (error) {
      console.error(error);
    }
  }
  
  // Функция для обновления профиля пользователя
  async function updateProfile(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
  
    try {
      const response = await fetch('/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ email, phone }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Профиль обновлен');
      } else {
        alert(data.message || 'Ошибка при обновлении профиля');
      }
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  }
  
  // Функция для загрузки аватара
  async function uploadAvatar(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    try {
      const response = await fetch('/users/upload-avatar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Аватар обновлен');
        document.getElementById('avatar').src = data.avatarUrl;
      } else {
        alert(data.message || 'Ошибка при загрузке аватара');
      }
    } catch (error) {
      console.error('Ошибка при загрузке аватара:', error);
    }
  }
  
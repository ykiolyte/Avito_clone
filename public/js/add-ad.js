// public/js/add-ad.js

document.addEventListener('DOMContentLoaded', () => {
    const adForm = document.querySelector('form[action="/ads"]');
  
    adForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(adForm);
  
      try {
        const response = await fetch('/ads', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Объявление добавлено');
          window.location.href = `/product/${data.ad.id}`;
        } else {
          alert(data.message || 'Ошибка при добавлении объявления');
        }
      } catch (error) {
        console.error('Ошибка при добавлении объявления:', error);
      }
    });
  });
  
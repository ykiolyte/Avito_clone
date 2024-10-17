// routes/userRoutes.js

const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Регистрация пользователя
router.post('/register', UserController.register);

// Авторизация пользователя
router.post('/login', UserController.login);

// Выход из системы
router.get('/logout', UserController.logout);

// Получение профиля пользователя
router.get('/profile', authMiddleware, UserController.getProfile);

// Обновление профиля пользователя
router.put('/profile', authMiddleware, UserController.updateProfile);

module.exports = router;

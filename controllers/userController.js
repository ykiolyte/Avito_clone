// controllers/userController.js

const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  /**
   * Регистрация пользователя
   */
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);

      await User.create({ username, email, passwordHash });

      // Перенаправление на страницу входа после успешной регистрации
      res.redirect('/login');
    } catch (error) {
      // Если ошибка связана с уникальностью email или username
      if (error.name === 'SequelizeUniqueConstraintError') {
        // Перенаправляем на страницу регистрации с сообщением об ошибке
        res.redirect('/register?error=exists');
      } else {
        next(error);
      }
    }
  }

  /**
   * Авторизация пользователя
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        // Перенаправляем на страницу входа с сообщением об ошибке
        return res.redirect('/login?error=invalid');
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        // Перенаправляем на страницу входа с сообщением об ошибке
        return res.redirect('/login?error=invalid');
      }

      // Создание JWT-токена
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Устанавливаем JWT-токен в cookie
      res.cookie('token', token, {
        httpOnly: true, // Защита от XSS
        // secure: true, // Включить при использовании HTTPS
        maxAge: 3600000, // 1 час в миллисекундах
      });

      // Перенаправляем на главную страницу
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Выход из системы
   */
  static logout(req, res) {
    res.clearCookie('token');
    res.redirect('/login');
  }

  /**
   * Получение профиля пользователя
   */
  static async getProfile(req, res, next) {
    try {
      const user = await User.findByPk(req.user.userId, {
        attributes: { exclude: ['passwordHash'] },
      });

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Обновление профиля пользователя
   */
  static async updateProfile(req, res, next) {
    try {
      const { username, email, phone } = req.body;
      const user = await User.findByPk(req.user.userId);

      user.username = username || user.username;
      user.email = email || user.email;
      user.phone = phone || user.phone;

      await user.save();

      res.json({ message: 'Профиль обновлен', user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

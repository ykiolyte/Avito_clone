// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.cookies.token; // Получаем токен из cookie

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Неверный токен
        return res.status(401).json({ message: 'Неавторизованный доступ' });
      }
      req.user = decoded; // Сохраняем данные пользователя в запросе
      next();
    });
  } else {
    // Токен отсутствует
    res.status(401).json({ message: 'Требуется авторизация' });
  }
}

module.exports = authMiddleware;

// controllers/reviewController.js

const { Review, User } = require('../models');

class ReviewController {
  /**
   * Добавление отзыва к товару
   */
  static async addReview(req, res, next) {
    try {
      const { rating, text } = req.body;
      const { adId } = req.params;
      const userId = req.user.userId;

      const review = await Review.create({
        rating,
        text,
        adId,
        userId,
      });

      res.status(201).json({ message: 'Отзыв добавлен', review });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получение отзывов для товара
   */
  static async getReviews(req, res, next) {
    try {
      const { adId } = req.params;

      const reviews = await Review.findAll({
        where: { adId },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['username'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReviewController;

// controllers/adController.js

const { Ad, AdImage, User } = require('../models');
const path = require('path');
const multer = require('multer');

// Настройка хранения файлов для Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/ads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array('images', 10);

class AdController {
  /**
   * Создание объявления
   */
  static async createAd(req, res, next) {
    upload(req, res, async function (err) {
      if (err) {
        return next(err);
      }

      try {
        const { title, description, price } = req.body;
        const ad = await Ad.create({
          title,
          description,
          price,
          userId: req.user.userId,
        });

        // Обработка загрузки изображений
        if (req.files) {
          const images = req.files.map((file) => ({
            imagePath: '/uploads/ads/' + file.filename,
            adId: ad.id,
          }));
          await AdImage.bulkCreate(images);
        }

        res.status(201).json({ message: 'Объявление создано', ad });
      } catch (error) {
        next(error);
      }
    });
  }

  /**
   * Получение всех объявлений
   */
  static async getAllAds(req, res, next) {
    try {
      const ads = await Ad.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['username'],
          },
          {
            model: AdImage,
            as: 'images',
          },
        ],
      });

      res.json(ads);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получение объявления по ID
   */
  static async getAdById(req, res, next) {
    try {
      const ad = await Ad.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['username', 'email', 'phone', 'id'],
          },
          {
            model: AdImage,
            as: 'images',
          },
        ],
      });

      if (!ad) {
        return res.status(404).json({ message: 'Объявление не найдено' });
      }

      res.json(ad);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdController;

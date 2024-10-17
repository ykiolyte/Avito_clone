// routes/adRoutes.js

const express = require('express');
const AdController = require('../controllers/adController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, AdController.createAd);
router.get('/', AdController.getAllAds);
router.get('/:id', AdController.getAdById);

module.exports = router;

// routes/reviewRoutes.js

const express = require('express');
const ReviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router({ mergeParams: true });

router.post('/', authMiddleware, ReviewController.addReview);
router.get('/', ReviewController.getReviews);

module.exports = router;

// routes/index.js

const express = require('express');
const path = require('path');
const router = express.Router();

const userRoutes = require('./userRoutes');
const adRoutes = require('./adRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/ads', adRoutes);
router.use('/ads/:adId/reviews', reviewRoutes);

// Маршруты для страниц
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'register.html'));
});

router.get('/product/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'product.html'));
});

router.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'profile.html'));
});

router.get('/add-ad', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'add-ad.html'));
});

router.get('/seller', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'seller.html'));
});

module.exports = router;

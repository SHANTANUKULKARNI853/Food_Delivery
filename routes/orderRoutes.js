const express = require('express');
const { createOrder, getUserOrders, getAllOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/create', createOrder);
router.get('/user/:userId', getUserOrders);
router.get('/admin/all', getAllOrders);

module.exports = router;

const express = require('express');
const { addOrderItems, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);

module.exports = router;
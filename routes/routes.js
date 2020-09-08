const express = require('express');
const transactionRouter = express.Router();

const TransactionController = require('../controllers/TransactionController');

transactionRouter.get('/', TransactionController.index);
transactionRouter.put('/:id', TransactionController.update);

module.exports = transactionRouter;

const AppError = require('../errors/AppError');
const Transaction = require('../models/TransactionModel');
const UpdateTransactionService = require('../services/UpdateTransactionService');
const CreateTransactionService = require('../services/CreateTransactionService');

class TransactionController {
  async create(request, response) {
    const { description, category, value, yearMonthDay, type } = request.body;

    const transaction = await CreateTransactionService.execute({
      description, 
      category, 
      value, 
      yearMonthDay, 
      type,
    });

    return response.json(transaction);
  }

  async index(request, response) {
    const { period } = request.query;

    if (!period) throw new AppError('É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm');

    const transactions = await Transaction.find({
      yearMonth: period
    })

    return response.json({
      length: transactions.length,
      transactions
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { description, category, value, yearMonthDay, type } = request.body;

    const updatedTransaction = await UpdateTransactionService.execute({
      id,
      description, 
      category, 
      value, 
      yearMonthDay, 
      type,
    });

    return response.json(updatedTransaction);
  }

  async delete(request, response) {
    const { id } = request.params;

    const transactionExists = await Transaction.findById(id)

    if (!transactionExists) throw new AppError('Transaction not found.');

    await Transaction.findByIdAndRemove(id);

    return response.status(204).send();
  }
}

module.exports = new TransactionController();


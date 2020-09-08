const TransactionModel = require("../models/TransactionModel");
const AppError = require("../errors/AppError");

class UpdateTransactionService {
  async execute({ id, description, category, value, yearMonthDay, type }) {
    const transactionExists = await TransactionModel.findById(id);

    if (!transactionExists) throw new AppError('Transaction not found.');

    if (!description || !category || !value || !yearMonthDay || !type)
      throw new AppError('All fields are required');

    const date = yearMonthDay.split('-');

    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      id,
      {
        description, 
        category, 
        value, 
        yearMonthDay, 
        type,
        year: date[0],
        month: date[1],
        day: date[2],
        yearMonth: `${date[0]}-${date[1]}`,
      },
      { new: true }
    )

    return updatedTransaction;
  }
}

module.exports = new UpdateTransactionService();
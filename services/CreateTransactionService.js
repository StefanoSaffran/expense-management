const TransactionModel = require("../models/TransactionModel");
const AppError = require("../errors/AppError");

class CreateTransactionService {
  async execute({ description, category, value, yearMonthDay, type }) {
    if (!description || !category || !value || !yearMonthDay || !type)
      throw new AppError('All fields are required');

    const date = yearMonthDay.split('-');

    const transaction = await TransactionModel.create({
        description, 
        category, 
        value, 
        yearMonthDay, 
        type,
        year: date[0],
        month: date[1],
        day: date[2],
        yearMonth: `${date[0]}-${date[1]}`,
      });

    return transaction;
  }
}

module.exports = new CreateTransactionService();
const TransactionModel = require("../models/TransactionModel");
const AppError = require('../errors/AppError');
const dateHelper = require('../utils/dateHelper');


class UpdateTransactionService {
  async execute({ id, description, category, value, year, month, day, type }) {
    const transactionExists = await TransactionModel.findById(id);

    if (!transactionExists) throw new AppError('Transaction not found.');

    const period = dateHelper.createPeriodFrom(year, month);
    const date = dateHelper.createDateFrom(year, month, day);

    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      id,
      {
        description, 
        category, 
        value, 
        type,
        day,
        month,
        year,
        yearMonth: period,
        yearMonthDay: date, 
      },
      { new: true }
    )

    return updatedTransaction;
  }
}

module.exports = new UpdateTransactionService();
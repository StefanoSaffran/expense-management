const TransactionModel = require("../models/TransactionModel");
const dateHelper = require('../utils/dateHelper');

class CreateTransactionService {
  async execute({ description, category, value, year, month, day, type }) {
      const period = dateHelper.createPeriodFrom(year, month);
      const date = dateHelper.createDateFrom(year, month, day);

    const transaction = await TransactionModel.create({
        description, 
        category, 
        value, 
        type,
        day,
        month,
        year,
        yearMonth: period,
        yearMonthDay: date, 
      });

    return transaction;
  }
}

module.exports = new CreateTransactionService();
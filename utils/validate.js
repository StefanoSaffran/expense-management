const AppError = require('../errors/AppError');
const dateHelper = require('../utils/dateHelper');

const validateTransactionData = async (body) => {
  const { description, value, category, year, month, day, type } = body;

  if (!description || description.trim() === '') {
    throw new AppError('A descrição é obrigatória');
  }

  if (!value || value < 0) {
    throw new AppError('O valor é obrigatório.');
  }

  if (!category || category.trim() === '') {
    throw new AppError('A categoria é obrigatória.');
  }

  if (!year || year.toString() === '') {
    throw new AppError(`O ano é obrigatório.`);
  }

  if (!month || month.toString() === '') {
    throw new AppError(`O mês é obrigatório.`);
  }

  if (!day || day.toString() === '') {
    throw new AppError(`O dia é obrigatório.`);
  }

  if (!type || type.toString() === '') {
    throw new AppError(`O tipo de lançamento é obrigatório.`);
  }

  if (value < 0) {
    throw new AppError('O valor deve ser maior ou igual a 0.');
  }

  const period = dateHelper.createPeriodFrom(year, month);
  dateHelper.validatePeriod(period);
  dateHelper.validateDay(day, month, year);

  if (type.trim() !== '+' && type.trim() !== '-') {
    throw new AppError(
      `Tipo de lançamento inválido (${type}) - A propriedade 'type' deve ter o valor '+' ou '-'`
    );
  }
}

module.exports = validateTransactionData;
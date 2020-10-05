const AppError = require('../errors/AppError');

function validatePeriod(period) {
  if (period.length !== 7) {
    throw new AppError(`Valor inválido (${period}). Utilize o formato yyyy-mm`);
  }

  const year = period.substring(0, 4);
  if (!+year) {
    throw new AppError(`Ano inválido (${year})`);
  }

  const month = period.substring(5, 7);
  if (!+month || +month < 1 || +month > 12) {
    throw new AppError(`Mês inválido (${month})`);
  }
}

function createPeriodFrom(year, month) {
  return `${year.toString().padStart(4, '0')}-${month
    .toString()
    .padStart(2, '0')}`;
}

function createDateFrom(year, month, day) {
  return `${createPeriodFrom(year, month)}-${day.toString().padStart(2, '0')}`;
}

function checkLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function validateDay(day, month, year) {
  if (day <= 0) {
    throw new AppError(
      'O dia deve ser um número positivo maior que 0 e menor que 28, 29, 30 ou 31, dependendo do mês/ano'
    );
  }

  if (month === 2) {
    const isLeapYear = checkLeapYear(year);
    const maxDays = isLeapYear(year) ? 29 : 28;

    if (day > maxDays) {
      throw new AppError(`Dia inválido para o mês 02 (Fevereiro) do ano ${year}`);
    }
  }

  if ([1, 3, 5, 7, 8, 10, 12].find((number) => number === month)) {
    if (day > 31) {
      throw new AppError(`Dia inválido (${day}) para o mês ${month}`);
    }
  }

  if (day > 30) {
    throw new AppError(`Dia inválido (${day}) para o mês ${month}`);
  }
}

module.exports = {
  validatePeriod,
  createPeriodFrom,
  validateDay,
  createDateFrom,
};

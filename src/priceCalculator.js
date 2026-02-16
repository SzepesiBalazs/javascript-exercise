const calculatePlan = (
  plan,
  months = 1,
  discountPercentageCodes = [],
  discountFixedCodes = [],
  tax = 0,
) => {
  const prices = {
    basic: 10,
    pro: 20,
    enterprise: 30,
  };

  if (!validateInput(prices, plan, months)) {
    return undefined;
  }

  const total = new PriceCalculator(prices[plan])
    .calculatePriceForMonths(months)
    .calculatePercentageDiscountPrice(discountPercentageCodes)
    .calculateFixedDiscountPrice(discountFixedCodes)
    .calculatePriceWithTax(tax);

  return Math.max(total.price, 0);
};

function validateInput(prices, plan, months) {
  if (prices[plan] === undefined) {
    return false;
  }

  if (typeof months !== "number" || months < 1) {
    return false;
  }

  return true;
}

export class PriceCalculator {
  constructor(price) {
    this.price = price;
  }

  calculatePriceForMonths(months) {
    this.price *= months;

    return this;
  }

  calculatePercentageDiscountPrice(discountPercentageCodes) {
    const DISCOUNT_PERCENTAGE_CODES = {
      "10percent": 0.1,
      "25percent": 0.25,
      "50percent": 0.5,
    };

    if (discountPercentageCodes.length === 0) {
      return this;
    }

    for (const code of discountPercentageCodes) {
      if (DISCOUNT_PERCENTAGE_CODES[code]) {
        this.price -= this.price * DISCOUNT_PERCENTAGE_CODES[code];
      }
    }

    return this;
  }

  calculateFixedDiscountPrice(discountFixedCodes) {
    const DISCOUNT_FIXED_CODES = {
      "5off": 5,
      "10off": 10,
      "20off": 20,
    };

    if (discountFixedCodes.length === 0) {
      return this;
    }

    for (const code of discountFixedCodes) {
      if (DISCOUNT_FIXED_CODES[code]) {
        this.price -= DISCOUNT_FIXED_CODES[code];
      }
    }

    return this;
  }

  calculatePriceWithTax(tax) {
    this.price *= 1 + tax;
    return this;
  }
}

export default calculatePlan;

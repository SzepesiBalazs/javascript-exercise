const calculatePlan = (
  plan,
  months = 1,
  discountPercentageCodes = [],
  discountFixedCodes = [],
) => {
  const prices = {
    basic: 10,
    pro: 20,
    enterprise: 30,
  };

  if (prices[plan] === undefined) {
    return undefined;
  }

  if (typeof months !== "number" || months < 1) {
    return undefined;
  }

  let total = prices[plan] * months;
  total = calculatePercentageDiscountPrice(total, discountPercentageCodes);
  total = calculateFixedDiscountPrice(total, discountFixedCodes);

  return Math.max(total, 0);
};

const calculatePercentageDiscountPrice = (price, discountPercentageCodes) => {
  let calculatedPrice = price;

  const DISCOUNT_PERCENTAGE_CODES = {
    "10percent": 0.1,
    "25percent": 0.25,
    "50percent": 0.5,
  };

  if (discountPercentageCodes.length === 0) {
    return calculatedPrice;
  }

  for (const code of discountPercentageCodes) {
    if (DISCOUNT_PERCENTAGE_CODES[code]) {
      calculatedPrice =
        calculatedPrice - calculatedPrice * DISCOUNT_PERCENTAGE_CODES[code];
    }
  }

  return calculatedPrice;
};

const calculateFixedDiscountPrice = (price, discountFixedCodes) => {
  let calculatedPrice = price;

  const DISCOUNT_FIXED_CODES = {
    "5off": 5,
    "10off": 10,
    "20off": 20,
  };

  if (discountFixedCodes.length === 0) {
    return calculatedPrice;
  }

  for (const code of discountFixedCodes) {
    if (DISCOUNT_FIXED_CODES[code]) {
      calculatedPrice = calculatedPrice - DISCOUNT_FIXED_CODES[code];
    }
  }

  return calculatedPrice;
};

export default calculatePlan;

export default class SubscriptionPlan {
  constructor(prices, name, uuid) {
    this.prices = prices; // [10, 20, 30]
    this.name = name;
    this.uuid = uuid;
  }

  #isPricePositive(price) {
    return price > 0;
  }

  #isPriceNumber(price) {
    return typeof price === "number";
  }

  #isPriceValid(price) {
    return this.#isPriceNumber(price) && this.#isPricePositive(price);
  }

  calculatePrice(tier = 1, discount = 0) {

    tier = Math.max(tier, 1);
    
    const basePrice = this.prices[tier - 1];

    if (!this.#isPriceValid(basePrice)) {
      throw new Error("Invalid price. Price must be a positive number.");
    }

    const discountedPrice = basePrice * (1 - discount);

    if (!this.#isPriceValid(discountedPrice)) {
      throw new Error("Invalid price. Price must be a positive number.");
    }

    const result = Math.round(discountedPrice * 100) / 100;

    return result;
  }
}

/*

let someSubscriptionPlan = new SubscriptionPlan([10, 20, 30], "Basic Plan", "1234-5678");

let discountedPrice = someSubscriptionPlan.calculatePrice(1, 0.35);

*/

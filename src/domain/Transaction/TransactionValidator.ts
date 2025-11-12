import { calc } from "@spoonkit/signals/Calc";
import { TransactionModel } from "./TransactionModel";

export function createTransactionValidator(transaction: TransactionModel) {
  const { description, amount, date, category } = transaction;

  const validations = {
    description: calc(() => v(description.get(), isRequired())),
    amount: calc(() => v(amount.get(), isRequired())),
    //date: calc(() => v(date.get(), isRequired())),
    //category: calc(() => v(category.get(), isRequired())),
  };

  const isValid = calc(() => {
    return Object.values(validations)
      .map((validation) => validation.get())
      .flat()
      .every((err) => err === null);
  });

  return {
    ...validations,
    isValid,
  };
}

function v<T>(value: T, ...rules: ((value: T) => string | null)[]) {
  return rules.map((rule) => rule(value)).filter((error) => error !== null);
}

function isRequired(): (value: string | number) => string | null {
  return (value: string | number) =>
    value === null || value === undefined || value.toString().trim() === ""
      ? "This field is required."
      : null;
}

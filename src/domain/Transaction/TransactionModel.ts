import { Infer } from "@spoonkit/Infer";
import { state } from "@spoonkit/signals/State";
import { stateObject } from "@spoonkit/signals/stateObject";

export type iTransaction = Infer<typeof createTransactionModel>;
export type TransactionModel = ReturnType<typeof createTransactionModel>;

export const createTransactionModel = () =>
  stateObject({
    _id: state<string>(),
    amount: state<number>(),
    date: state<string>(),
    description: state<string>(),
    category: state<string>(),
  });

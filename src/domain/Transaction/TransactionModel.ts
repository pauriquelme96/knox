import { Infer } from "@spoonkit/Infer";
import { state } from "@spoonkit/signals/State";
import { stateArray } from "@spoonkit/signals/stateArray";
import { stateObject } from "@spoonkit/signals/stateObject";

export type iTransaction = Infer<typeof TransactionModel>;
export type TransactionModel = ReturnType<typeof TransactionModel>;

export const TransactionModel = () =>
  stateObject({
    _id: state<string>(),
    amount: state<number>(),
    description: state<string>(),
    category: state<string>(),
    tags: stateArray(() => state<string>()),
    // --
    modified_date: state<Date>(),
    created_date: state<Date>(),
  });

/*

const transaction = new TransactionEntity();

transaction.model.set({
  amount: 100,
  description: "Grocery shopping",
  tags: ["groceries", "food"],
  periodicity: "monthly",
  effective_date: new Date(),
});


transaction.save();

transaction.settle();

*/

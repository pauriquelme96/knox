import { Infer } from "@spoonkit/Infer";
import { state } from "@spoonkit/signals/State";
import { stateArray } from "@spoonkit/signals/stateArray";
import { stateObject } from "@spoonkit/signals/stateObject";

export type iBudget = Infer<typeof BudgetModel>;
export type BudgetModel = ReturnType<typeof BudgetModel>;

export const BudgetModel = () =>
  stateObject({
    _id: state<string>(),
    name: state<string>(),
    total_amount: state<number>(),
    total_balance: state<number>(),
    expenses: stateArray(() => ExpenseModel()),
  });

export type iExpense = Infer<typeof ExpenseModel>;
export type ExpenseModel = ReturnType<typeof ExpenseModel>;

export const ExpenseModel = () =>
  stateObject({
    name: state<string>(),
    amount: state<number>(),
    balance: state<number>(),
    type: state<"fixed" | "variable">(),
    transaction_ids: stateArray(() => state<string>()),
  });

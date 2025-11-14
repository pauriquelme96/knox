import { provide } from "@spoonkit/provider";
import { BudgetModel, iBudget, iExpense } from "./BudgetModel";
import { BudgetApi } from "./BudgetApi";

export class BudgetEntity {
  private api = provide(BudgetApi);
  public model = BudgetModel();

  constructor(data?: iBudget) {
    if (data) this.model.set(data);
  }

  save() {
    const response = this.model._id.get()
      ? this.api.update(this.model._id.get(), this.model.get())
      : this.api.create(this.model.get());

    this.model.set(response);
  }

  delete() {
    if (!this.model._id.get()) {
      return;
    }

    this.api.remove(this.model._id.get());
  }

  settleExpenseAt(index: number) {
    const expense = this.model.expenses.at(index).get();
  }

  addExpense(expense: iExpense) {
    this.model.expenses.push(expense);
  }

  removeExpenseAt(index: number) {
    this.model.expenses.removeAt(index);
  }
}

import { LocalStorageClient } from "@services/LocalStorageClient";
import { iBudget } from "./BudgetModel";

export class BudgetApi {
  private api = new LocalStorageClient<iBudget>("budgets");

  create(budget: iBudget): iBudget {
    return this.api.create(budget);
  }

  update(_id: string, updatedBudget: iBudget): iBudget {
    return this.api.update(_id, updatedBudget);
  }

  list(): iBudget[] {
    return this.api.list();
  }

  remove(_id: string): void {
    this.api.remove(_id);
  }
}

import { Ctrl } from "@spoonkit/Ctrl";
import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { BudgetApi } from "src/domain/Budget/BudgetApi";
import { provide } from "@spoonkit/provider";
import { state } from "@spoonkit/signals/State";
import { BudgetDetailCtrl } from "./budget-detail/BudgetDetailCtrl";
import { BudgetEntity } from "src/domain/Budget/BudgetEntity";
import { stateArray } from "@spoonkit/signals/stateArray";

export class BudgetPageCtrl extends Ctrl {
  private budgetApi = provide(BudgetApi);

  public budgetList = stateArray(() => state<BudgetDetailCtrl>());

  public createBudgetButton = new ButtonCtrl().set({
    label: "Create Budget",
    onClick: async () => {
      const newBudget = new BudgetEntity();
      this.budgetList.push(new BudgetDetailCtrl(newBudget));
    },
  });

  ctrlStart() {
    const budgets = this.budgetApi
      .list()
      .map((data) => new BudgetEntity(data))
      .map((budget) => new BudgetDetailCtrl(budget));

    this.budgetList.set(budgets);
  }
}

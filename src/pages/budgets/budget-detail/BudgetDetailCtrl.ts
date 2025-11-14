import { InputCtrl } from "@components/Input/InputCtrl";
import { Ctrl } from "@spoonkit/Ctrl";
import { BudgetEntity } from "src/domain/Budget/BudgetEntity";
import { ExpensesTableCtrl } from "./ExpensesTableCtrl";

export class BudgetDetailCtrl extends Ctrl {
  public name = new InputCtrl().set({
    label: "Budget Name",
    value: this.budget.model.name,
  });

  public expensesTable = new ExpensesTableCtrl(this.budget);

  constructor(private budget: BudgetEntity) {
    super();
  }
}

import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { InputCtrl } from "@components/Input/InputCtrl";
import { SelectCtrl } from "@components/Select/SelectCtrl";
import { RowModel, TableCtrl } from "@components/Table/TableCtrl";
import { monitor } from "@spoonkit/signals/Monitor";
import { state } from "@spoonkit/signals/State";
import { BudgetEntity } from "src/domain/Budget/BudgetEntity";
import { ExpenseModel } from "src/domain/Budget/BudgetModel";

export class ExpensesTableCtrl extends TableCtrl<ExpenseModel> {
  public columns = state([
    { id: "name", label: "Name", width: "auto" },
    { id: "amount", label: "Amount", width: "auto" },
    { id: "type", label: "Type", width: "auto" },
    { id: "delete", label: "", width: "auto" },
  ]);

  public addExpenseButton = new ButtonCtrl().set({
    label: "Add Expense",
    onClick: () => {
      this.budget.addExpense({
        name: "",
        amount: 0,
        balance: 0,
        settled: false,
        type: "variable",
        transaction_ids: [],
      });
    },
  });

  public saveButton = new ButtonCtrl().set({
    label: "Save Expenses",
    onClick: () => {
      this.budget.save();
    },
  });

  constructor(private budget: BudgetEntity) {
    super();

    monitor(() => {
      this.setData(budget.model.expenses.toArray());
    });
  }

  public buildRow(expense: ExpenseModel, index: number): RowModel {
    return {
      name: new InputCtrl().set({
        value: expense.name,
      }),
      amount: new InputCtrl().set({
        value: expense.amount,
      }),
      type: new SelectCtrl<{ label: string; value: string }, string>().set({
        value: expense.type,
        labelKey: "label",
        valueKey: "value",
        options: [
          {
            label: "Fixed",
            value: "fixed",
          },
          {
            label: "Variable",
            value: "variable",
          },
        ],
        placeholder: "Select type",
      }),
      delete: new ButtonCtrl().set({
        label: "Delete",
        onClick: () => {
          this.budget.removeExpenseAt(index);
        },
      }),
    };
  }

  public rowKeyFn(item: ExpenseModel): string | number {
    return item.name.get();
  }
}

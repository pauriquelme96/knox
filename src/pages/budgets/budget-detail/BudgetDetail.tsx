import { useCtrl } from "@spoonkit/useCtrl";
import { BudgetDetailCtrl } from "./BudgetDetailCtrl";
import { Input } from "@components/Input/Input";
import { Table } from "@components/Table/Table";
import { Button } from "@components/Button/Button";

export function BudgetDetail({ ctrl }: { ctrl: BudgetDetailCtrl }) {
  const { self } = useCtrl(ctrl);

  return (
    <div className="card p-4 mb-4 bg-sky-900/30 rounded-xl">
      <label>Budget Name:</label>
      <Input ctrl={self.name} />
      <Table ctrl={self.expensesTable} />
      <div className="flex gap-3">
        <Button ctrl={self.expensesTable.addExpenseButton} />
        <Button ctrl={self.expensesTable.saveButton} />
      </div>
    </div>
  );
}

import { useCtrl } from "@spoonkit/useCtrl";
import { BudgetPageCtrl } from "./BudgetPageCtrl";
import { Button } from "@components/Button/Button";
import { BudgetDetail } from "./budget-detail/BudgetDetail";

export function BudgetPage() {
  const { self } = useCtrl(BudgetPageCtrl);

  return (
    <div>
      <h2>Budgets</h2>
      <Button ctrl={self.createBudgetButton} />
      {self.budgetList.get()?.map((budgetDetail) => (
        <BudgetDetail key={budgetDetail.key} ctrl={budgetDetail} />
      ))}
    </div>
  );
}

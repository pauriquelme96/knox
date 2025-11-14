import { useCtrl } from "@spoonkit/useCtrl";
import { BudgetCtrl } from "./BudgetCtrl";

export function Budget() {
  const { self } = useCtrl(BudgetCtrl);

  return <div>Budget Page</div>;
}

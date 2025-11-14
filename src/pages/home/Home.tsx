import { Button } from "src/components/Button/Button";
import { TransactionsPage } from "../transactions/TransactionsPage";
import { useCtrl } from "@spoonkit/useCtrl";
import { HomeCtrl } from "./HomeCtrl";
import { BudgetPage } from "@pages/budgets/BudgetPage";

export function Home() {
  const { self } = useCtrl(HomeCtrl);

  return (
    <div className="flex flex-col gap-3">
      <h1>KNOX</h1>
      <div className="flex gap-2">
        {self.tabs.map((tab) => (
          <Button key={tab.label.get()} ctrl={tab} />
        ))}
      </div>
      {self.activeTab.get() === "movements" && <TransactionsPage />}
      {self.activeTab.get() === "budgets" && <BudgetPage />}
    </div>
  );
}

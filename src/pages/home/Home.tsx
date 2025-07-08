import { useCtrl } from "@spoon-kit-react/useCtrl";
import { HomeCtrl } from "./HomeCtrl";
import { Button } from "src/components/Button/Button";
import { TransactionsPage } from "../transactions/TransactionsPage";
import { Deposits } from "../deposits/Deposits";
import { Debts } from "../debts/Debts";
import { Forecasts } from "../forecasts/Forecasts";

export function Home() {
  const { state, self } = useCtrl(HomeCtrl);

  return (
    <div className="flex flex-col gap-3">
      <h1>KNOX</h1>
      <div className="flex gap-2">
        {self.tabs.map((tab) => (
          <Button key={tab.label.get()} ctrl={tab} />
        ))}
      </div>
      {state.activeTab === "movements" && <TransactionsPage />}
      {state.activeTab === "deposits" && <Deposits />}
      {state.activeTab === "debts" && <Debts />}
      {state.activeTab === "forecasts" && <Forecasts />}
    </div>
  );
}

import { useCtrl } from "@spoonkit/useCtrl";
import { PlanningPageCtrl } from "./PlanningPageCtrl";
import { Navbar } from "@components/Navbar/Navbar";
import { PlanningItem } from "./PlanningItem/PlanningItem";
import { Dialog } from "@components/Dialog/Dialog";

export function PlanningPage() {
  const { self } = useCtrl(PlanningPageCtrl);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-100">
      <Navbar ctrl={self.navbar} />
      <div className="mx-auto p-4 space-y-4">
        {self.planningItems.get().map((itemCtrl) => (
          <PlanningItem key={itemCtrl.key} ctrl={itemCtrl} />
        ))}
      </div>
      <Dialog ctrl={self.createDialog} />
    </div>
  );
}

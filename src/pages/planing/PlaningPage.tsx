import { useCtrl } from "@spoonkit/useCtrl";
import { PlaningPageCtrl } from "./PlaningPageCtrl";
import { Navbar } from "@components/Navbar/Navbar";
import { PlaningItem } from "./PlaningItem/PlaningItem";

export function PlaningPage() {
  const { self } = useCtrl(PlaningPageCtrl);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-100">
      <Navbar ctrl={self.navbar} />
      <div className="mx-auto p-4 space-y-4">
        {self.planingItems.get().map((itemCtrl) => (
          <PlaningItem key={itemCtrl.key} ctrl={itemCtrl} />
        ))}
      </div>
    </div>
  );
}

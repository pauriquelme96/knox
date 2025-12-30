import { useCtrl } from "@spoonkit/useCtrl";
import { PlaningItemCtrl } from "./PlaningItemCtrl";
import { Dropdown } from "@components/Dropdown/Dropdown";

export function PlaningItem({ ctrl }: { ctrl: PlaningItemCtrl }) {
  const { self } = useCtrl(ctrl);

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-2xl transition-shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-2xl">{self.title.get()}</h2>
          <Dropdown ctrl={self.options} />
        </div>
      </div>
    </div>
  );
}

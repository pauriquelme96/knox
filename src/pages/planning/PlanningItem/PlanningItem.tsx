import { useCtrl } from "@spoonkit/useCtrl";
import { PlanningItemCtrl } from "./PlanningItemCtrl";
import { Dropdown } from "@components/Dropdown/Dropdown";
import { Dialog } from "@components/Dialog/Dialog";
import { useNavigate } from "react-router-dom";

export function PlanningItem({ ctrl }: { ctrl: PlanningItemCtrl }) {
  const { self } = useCtrl(ctrl);
  const navigate = useNavigate();

  const handleCardClick = () => {
    const id = self.getPlanningId();
    if (id) {
      navigate(`/planning/${id}`);
    }
  };

  return (
    <>
      <div
        className="card bg-base-100 shadow-sm hover:shadow-2xl transition-shadow cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="card-body">
          <div className="flex justify-between items-start">
            <h2 className="card-title text-2xl">{self.title.get()}</h2>
            <div onClick={(e) => e.stopPropagation()}>
              <Dropdown ctrl={self.options} />
            </div>
          </div>
        </div>
      </div>
      <Dialog ctrl={self.editDialog} />
      <Dialog ctrl={self.deleteDialog} />
    </>
  );
}

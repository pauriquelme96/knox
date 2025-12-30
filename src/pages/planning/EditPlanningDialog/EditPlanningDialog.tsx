import { useCtrl } from "@spoonkit/useCtrl";
import { EditPlanningDialogCtrl } from "./EditPlanningDialogCtrl";
import { Input } from "@components/Input/Input";

export function EditPlanningDialog({ ctrl }: { ctrl: EditPlanningDialogCtrl }) {
  const { self } = useCtrl(ctrl);

  return (
    <div className="py-4">
      <label className="text-sm font-medium">Nombre</label>
      <div className="mt-2">
        <Input ctrl={self.nameInput} />
      </div>
    </div>
  );
}

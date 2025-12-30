import { useCtrl } from "@spoonkit/useCtrl";
import { EditPlaningDialogCtrl } from "./EditPlaningDialogCtrl";
import { Input } from "@components/Input/Input";

export function EditPlaningDialog({ ctrl }: { ctrl: EditPlaningDialogCtrl }) {
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

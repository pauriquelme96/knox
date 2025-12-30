import { useCtrl } from "@spoonkit/useCtrl";
import { CreatePlaningDialogCtrl } from "./CreatePlaningDialogCtrl";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";

export function CreatePlaningDialog({ ctrl }: { ctrl: CreatePlaningDialogCtrl }) {
  const { self } = useCtrl(ctrl);

  return (
    <div className="py-4">
      <label className="text-sm font-medium">Nombre</label>
      <div className="mt-2">
        <Input ctrl={self.nameInput} />
      </div>
      <div className="mt-6">
        <Button ctrl={self.saveButton} />
      </div>
    </div>
  );
}

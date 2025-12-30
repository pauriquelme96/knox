import { useCtrl } from "@spoonkit/useCtrl";
import { DeletePlaningDialogCtrl } from "./DeletePlaningDialogCtrl";
import { Button } from "@components/Button/Button";

export function DeletePlaningDialog({ ctrl }: { ctrl: DeletePlaningDialogCtrl }) {
  const { self } = useCtrl(ctrl);

  return (
    <div className="py-4">
      <p className="text-sm text-gray-600">
        ¿Seguro que quieres borrar la planificación {self.planingName.get()}?
      </p>
      <div className="mt-6 flex justify-between items-center">
        <Button ctrl={self.cancelButton} />
        <Button ctrl={self.deleteButton} />
      </div>
    </div>
  );
}

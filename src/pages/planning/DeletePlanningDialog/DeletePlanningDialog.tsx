import { useCtrl } from "@spoonkit/useCtrl";
import { DeletePlanningDialogCtrl } from "./DeletePlanningDialogCtrl";
import { Button } from "@components/Button/Button";

export function DeletePlanningDialog({ ctrl }: { ctrl: DeletePlanningDialogCtrl }) {
  const { self } = useCtrl(ctrl);

  return (
    <div className="py-4">
      <p className="text-sm text-gray-600">
        ¿Seguro que quieres borrar la planificación {self.planningName.get()}?
      </p>
      <div className="mt-6 flex justify-between items-center">
        <Button ctrl={self.cancelButton} />
        <Button ctrl={self.deleteButton} />
      </div>
    </div>
  );
}

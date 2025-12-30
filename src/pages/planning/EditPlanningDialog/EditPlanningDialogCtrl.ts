import { DialogCtrl } from "@components/Dialog/DialogCtrl";
import { InputCtrl } from "@components/Input/InputCtrl";
import { EditPlanningDialog } from "./EditPlanningDialog";
import { PlanningEntity } from "src/domain/Planning/PlanningEntity";
import { emitter } from "@spoonkit/signals/Emitter";
import { state } from "@spoonkit/signals/State";

export class EditPlanningDialogCtrl extends DialogCtrl {
  component? = EditPlanningDialog;
  onSaved = emitter<void>();

  title = state<string>("Editar Planificación");
  nameInput = new InputCtrl<string>().set({
    placeholder: "Nombre de la planificación...",
    value: this.planning.model.name,
  });

  constructor(private planning: PlanningEntity) {
    super();
  }

  public async close() {
    this.planning.save();
    this.onSaved.next();
    super.close();
  }
}

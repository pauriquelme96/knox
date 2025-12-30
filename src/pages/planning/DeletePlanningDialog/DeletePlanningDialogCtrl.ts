import { DialogCtrl } from "@components/Dialog/DialogCtrl";
import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { DeletePlanningDialog } from "./DeletePlanningDialog";
import { state } from "@spoonkit/signals/State";
import { emitter } from "@spoonkit/signals/Emitter";
import { PlanningEntity } from "src/domain/Planning/PlanningEntity";

export class DeletePlanningDialogCtrl extends DialogCtrl {
  component? = DeletePlanningDialog;

  title = state<string>("Eliminar planificación");
  planningName = state<string>(this.planning.model.name);

  cancelButton = new ButtonCtrl().set({
    label: "Cancelar",
    style: "ghost",
    onClick: () => super.close(),
  });

  deleteButton = new ButtonCtrl().set({
    label: "Eliminar",
    color: "neutral",
    onClick: () => this.confirmDelete(),
  });

  onDeleted = emitter<void>();

  constructor(private planning: PlanningEntity) {
    super();
  }

  private confirmDelete() {
    this.planning.drop();
    this.onDeleted.next();
    super.close();
  }
}

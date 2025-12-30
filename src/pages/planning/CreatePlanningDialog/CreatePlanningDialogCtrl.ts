import { DialogCtrl } from "@components/Dialog/DialogCtrl";
import { InputCtrl } from "@components/Input/InputCtrl";
import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { CreatePlanningDialog } from "./CreatePlanningDialog";
import { emitter } from "@spoonkit/signals/Emitter";
import { PlanningEntity } from "src/domain/Planning/PlanningEntity";
import { state } from "@spoonkit/signals/State";

export class CreatePlanningDialogCtrl extends DialogCtrl {
  component? = CreatePlanningDialog;

  private planningEntity: PlanningEntity;

  title = state<string>("Crear Planificación");
  nameInput = new InputCtrl<string>().set({
    placeholder: "Junio 2025...",
  });

  saveButton = new ButtonCtrl().set({
    label: "CREAR",
    color: "neutral",
    onClick: () => {
      this.planningEntity.save();
      this.onCreated.next();
      this.close();
    },
  });

  onCreated = emitter<void>();

  public open() {
    this.planningEntity = new PlanningEntity();
    this.nameInput.value.set(this.planningEntity.model.name);
    super.open();
  }
}

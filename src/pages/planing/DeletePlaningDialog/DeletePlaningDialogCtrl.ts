import { DialogCtrl } from "@components/Dialog/DialogCtrl";
import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { DeletePlaningDialog } from "./DeletePlaningDialog";
import { state } from "@spoonkit/signals/State";
import { emitter } from "@spoonkit/signals/Emitter";
import { PlaningEntity } from "src/domain/Planing/PlaningEntity";

export class DeletePlaningDialogCtrl extends DialogCtrl {
  component? = DeletePlaningDialog;

  title = state<string>("Eliminar planificación");
  planingName = state<string>(this.planing.model.name);

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

  constructor(private planing: PlaningEntity) {
    super();
  }

  private confirmDelete() {
    this.planing.drop();
    this.onDeleted.next();
    super.close();
  }
}

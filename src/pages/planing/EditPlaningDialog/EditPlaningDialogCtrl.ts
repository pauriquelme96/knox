import { DialogCtrl } from "@components/Dialog/DialogCtrl";
import { InputCtrl } from "@components/Input/InputCtrl";
import { EditPlaningDialog } from "./EditPlaningDialog";
import { PlaningEntity } from "src/domain/Planing/PlaningEntity";
import { emitter } from "@spoonkit/signals/Emitter";
import { state } from "@spoonkit/signals/State";

export class EditPlaningDialogCtrl extends DialogCtrl {
  component? = EditPlaningDialog;
  onSaved = emitter<void>();

  title = state<string>("Editar Planificación");
  nameInput = new InputCtrl<string>().set({
    placeholder: "Nombre de la planificación...",
    value: this.planing.model.name,
  });

  constructor(private planing: PlaningEntity) {
    super();
  }

  public async close() {
    this.planing.save();
    this.onSaved.next();
    super.close();
  }
}

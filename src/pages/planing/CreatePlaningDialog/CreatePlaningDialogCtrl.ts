import { DialogCtrl } from "@components/Dialog/DialogCtrl";
import { InputCtrl } from "@components/Input/InputCtrl";
import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { CreatePlaningDialog } from "./CreatePlaningDialog";
import { emitter } from "@spoonkit/signals/Emitter";
import { PlaningEntity } from "src/domain/Planing/PlaningEntity";
import { state } from "@spoonkit/signals/State";

export class CreatePlaningDialogCtrl extends DialogCtrl {
  component? = CreatePlaningDialog;

  private planingEntity: PlaningEntity;

  title = state<string>("Crear Planificación");
  nameInput = new InputCtrl<string>().set({
    placeholder: "Junio 2025...",
  });

  saveButton = new ButtonCtrl().set({
    label: "CREAR",
    color: "neutral",
    onClick: () => {
      this.planingEntity.save();
      this.onCreated.next();
      this.close();
    },
  });

  onCreated = emitter<void>();

  public open() {
    this.planingEntity = new PlaningEntity();
    this.nameInput.value.set(this.planingEntity.model.name);
    super.open();
  }
}

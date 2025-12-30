import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { DropdownCtrl } from "@components/Dropdown/DropdownCtrl";
import { IconCtrl } from "@components/Icon/IconCtrl";
import { Ctrl } from "@spoonkit/Ctrl";
import { state } from "@spoonkit/signals/State";
import { emitter } from "@spoonkit/signals/Emitter";
import { PlaningEntity } from "src/domain/Planing/PlaningEntity";
import { EditPlaningDialogCtrl } from "../EditPlaningDialog/EditPlaningDialogCtrl";
import { DeletePlaningDialogCtrl } from "../DeletePlaningDialog/DeletePlaningDialogCtrl";

export class PlaningItemCtrl extends Ctrl {
  public title = state<string>(this.planing.model.name);
  public onUpdate = emitter<void>();

  public editDialog = new EditPlaningDialogCtrl(this.planing).set({
    onSaved: () => this.onUpdate.next(),
  });

  public deleteDialog = new DeletePlaningDialogCtrl(this.planing).set({
    onDeleted: () => this.onUpdate.next(),
  });

  public options = new DropdownCtrl().set({
    button: new ButtonCtrl().set({
      leftIcon: new IconCtrl().set({ name: "v-ellipsis" }),
      style: "ghost",
    }),
    align: "end",
    items: [
      {
        label: "Editar",
        onClick: () => this.editDialog.open(),
      },
      {
        label: "Duplicar",
        onClick: () => {
          const newEntity = new PlaningEntity({
            ...this.planing.model.get(),
            _id: undefined,
            name: this.planing.model.name.get() + " (Copia)",
          });

          newEntity.save();
          this.onUpdate.next();
        },
      },
      {
        label: "Borrar",
        onClick: () => this.deleteDialog.open(this.planing),
      },
    ],
  });

  constructor(public planing: PlaningEntity) {
    super();
  }

  public getPlaningId(): string {
    return this.planing.model._id.get();
  }
}

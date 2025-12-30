import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { DropdownCtrl } from "@components/Dropdown/DropdownCtrl";
import { IconCtrl } from "@components/Icon/IconCtrl";
import { Ctrl } from "@spoonkit/Ctrl";
import { state } from "@spoonkit/signals/State";
import { emitter } from "@spoonkit/signals/Emitter";
import { PlanningEntity } from "src/domain/Planning/PlanningEntity";
import { EditPlanningDialogCtrl } from "../EditPlanningDialog/EditPlanningDialogCtrl";
import { DeletePlanningDialogCtrl } from "../DeletePlanningDialog/DeletePlanningDialogCtrl";

export class PlanningItemCtrl extends Ctrl {
  public title = state<string>(this.planning.model.name);
  public onUpdate = emitter<void>();

  public editDialog = new EditPlanningDialogCtrl(this.planning).set({
    onSaved: () => this.onUpdate.next(),
  });

  public deleteDialog = new DeletePlanningDialogCtrl(this.planning).set({
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
          const newEntity = new PlanningEntity({
            ...this.planning.model.get(),
            _id: undefined,
            name: this.planning.model.name.get() + " (Copia)",
          });

          newEntity.save();
          this.onUpdate.next();
        },
      },
      {
        label: "Borrar",
        onClick: () => this.deleteDialog.open(this.planning),
      },
    ],
  });

  constructor(public planning: PlanningEntity) {
    super();
  }

  public getPlanningId(): string {
    return this.planning.model._id.get();
  }
}

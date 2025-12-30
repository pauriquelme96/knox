import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { IconCtrl } from "@components/Icon/IconCtrl";
import { NavbarCtrl } from "@components/Navbar/NavbarCtrl";
import { Ctrl } from "@spoonkit/Ctrl";
import { PlanningItemCtrl } from "./PlanningItem/PlanningItemCtrl";
import { state } from "@spoonkit/signals/State";
import { PlanningEntity } from "src/domain/Planning/PlanningEntity";
import { CreatePlanningDialogCtrl } from "./CreatePlanningDialog/CreatePlanningDialogCtrl";
import { provide } from "@spoonkit/provider";
import { PlanningApi } from "src/domain/Planning/PlanningApi";

export class PlanningPageCtrl extends Ctrl {
  private api = provide(PlanningApi);

  public createDialog = new CreatePlanningDialogCtrl().set({
    onCreated: () => this.loadPlannings(),
  });

  public navbar = new NavbarCtrl().set({
    title: "Planificación",
    rightSlot: new ButtonCtrl().set({
      style: "ghost",
      leftIcon: new IconCtrl().set({
        name: "plus",
      }),
      onClick: () => this.createDialog.open(),
    }),
  });

  public planningItems = state<PlanningItemCtrl[]>([]);

  ctrlStart() {
    this.loadPlannings();
  }

  private loadPlannings() {
    const plannings = this.api
      .list()
      .map((p) => new PlanningEntity(p))
      .map((e) =>
        new PlanningItemCtrl(e).set({
          onUpdate: () => this.loadPlannings(),
        })
      );

    this.planningItems.set(plannings);
  }
}

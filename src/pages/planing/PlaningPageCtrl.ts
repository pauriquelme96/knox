import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { IconCtrl } from "@components/Icon/IconCtrl";
import { NavbarCtrl } from "@components/Navbar/NavbarCtrl";
import { Ctrl } from "@spoonkit/Ctrl";
import { PlaningItemCtrl } from "./PlaningItem/PlaningItemCtrl";
import { state } from "@spoonkit/signals/State";
import { PlaningEntity } from "src/domain/Planing/PlaningEntity";
import { CreatePlaningDialogCtrl } from "./CreatePlaningDialog/CreatePlaningDialogCtrl";
import { provide } from "@spoonkit/provider";
import { PlaningApi } from "src/domain/Planing/PlaningApi";

export class PlaningPageCtrl extends Ctrl {
  private api = provide(PlaningApi);

  public createDialog = new CreatePlaningDialogCtrl().set({
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

  public planingItems = state<PlaningItemCtrl[]>([]);

  ctrlStart() {
    this.loadPlannings();
  }

  private loadPlannings() {
    const plannings = this.api
      .list()
      .map((p) => new PlaningEntity(p))
      .map((e) =>
        new PlaningItemCtrl(e).set({
          onUpdate: () => this.loadPlannings(),
        })
      );

    this.planingItems.set(plannings);
  }
}

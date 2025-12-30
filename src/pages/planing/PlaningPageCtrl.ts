import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { IconCtrl } from "@components/Icon/IconCtrl";
import { NavbarCtrl } from "@components/Navbar/NavbarCtrl";
import { Ctrl } from "@spoonkit/Ctrl";
import { PlaningItemCtrl } from "./PlaningItem/PlaningItemCtrl";
import { state } from "@spoonkit/signals/State";
import { PlaningEntity } from "src/domain/Planing/PlaningEntity";

export class PlaningPageCtrl extends Ctrl {
  public navbar = new NavbarCtrl().set({
    title: "Planning Page",
    rightSlot: new ButtonCtrl().set({
      style: "ghost",
      leftIcon: new IconCtrl().set({
        name: "plus",
      }),
      onClick: () => {},
    }),
  });

  public planingItems = state<PlaningItemCtrl[]>([]);

  ctrlStart() {
    this.planingItems.set([
      new PlaningItemCtrl(new PlaningEntity({ name: "Enero 26" } as any)),
    ]);
  }
}

import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { IconCtrl } from "@components/Icon/IconCtrl";
import { NavbarCtrl } from "@components/Navbar/NavbarCtrl";
import { Ctrl } from "@spoonkit/Ctrl";
import { state } from "@spoonkit/signals/State";

export class PlanningDetailCtrl extends Ctrl {
  public planningId = state<string>();
  public planningName = state<string>("");

  public navbar = new NavbarCtrl().set({
    title: "Detalle de Planificaci\u00f3n",
    leftSlot: new ButtonCtrl().set({
      style: "ghost",
      leftIcon: new IconCtrl().set({
        name: "arrow-left",
      }),
      onClick: () => {
        window.history.back();
      },
    }),
  });
}

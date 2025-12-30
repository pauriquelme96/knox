import { ButtonCtrl } from "@components/Button/ButtonCtrl";
import { DropdownCtrl } from "@components/Dropdown/DropdownCtrl";
import { IconCtrl } from "@components/Icon/IconCtrl";
import { Ctrl } from "@spoonkit/Ctrl";
import { state } from "@spoonkit/signals/State";
import { PlaningEntity } from "src/domain/Planing/PlaningEntity";

export class PlaningItemCtrl extends Ctrl {
  public title = state<string>(this.planing.model.name);

  public options = new DropdownCtrl().set({
    button: new ButtonCtrl().set({
      leftIcon: new IconCtrl().set({ name: "v-ellipsis" }),
      style: "ghost",
    }),
    align: "end",
    items: [
      {
        label: "Edit",
        onClick: () => {
          console.log("Edit clicked");
        },
      },
      {
        label: "Delete",
        onClick: () => {
          console.log("Delete clicked");
        },
      },
      {
        label: "Duplicate",
        onClick: () => {
          console.log("Duplicate clicked");
        },
      },
    ],
  });

  constructor(private planing: PlaningEntity) {
    super();
  }
}

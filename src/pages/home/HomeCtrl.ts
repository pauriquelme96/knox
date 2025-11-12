import { Ctrl } from "@spoonkit/Ctrl";
import { calc } from "@spoonkit/signals/Calc";
import { state } from "@spoonkit/signals/State";
import { ButtonCtrl } from "src/components/Button/ButtonCtrl";

export class HomeCtrl extends Ctrl {
  public activeTab = state<string>("movements");

  private calcTabLabel = (label: string) => {
    return calc(() => {
      return (
        this.activeTab.get() === label ? "> " + label : label
      ).toUpperCase();
    });
  };

  public tabs = [
    new ButtonCtrl().set({
      label: this.calcTabLabel("movements"),
      onClick: () => this.activeTab.set("movements"),
    }),
    new ButtonCtrl().set({
      label: this.calcTabLabel("deposits"),
      onClick: () => this.activeTab.set("deposits"),
    }),
    new ButtonCtrl().set({
      label: this.calcTabLabel("debts"),
      onClick: () => this.activeTab.set("debts"),
    }),
    new ButtonCtrl().set({
      label: this.calcTabLabel("forecasts"),
      onClick: () => this.activeTab.set("forecasts"),
    }),
  ];
}

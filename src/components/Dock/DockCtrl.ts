import { IconCtrl } from "@components/Icon/IconCtrl";
import { Ctrl } from "@spoonkit/Ctrl";
import { state } from "@spoonkit/signals/State";
import { stateArray } from "@spoonkit/signals/stateArray";
import { stateObject } from "@spoonkit/signals/stateObject";

export class DockCtrl extends Ctrl {
  items = stateArray(() =>
    stateObject({
      label: state<string>(),
      icon: state<IconCtrl>(),
      onClick: state<() => void>(),
    })
  );
}

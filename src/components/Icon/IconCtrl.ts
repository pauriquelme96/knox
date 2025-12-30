import { Ctrl } from "@spoonkit/Ctrl";
import { state } from "@spoonkit/signals/State";
import { Icon } from "./Icon";

export type IconNames =
  | "house"
  | "arrow-left"
  | "arrow-left-right"
  | "chevron-left"
  | "landmark"
  | "piggy-bank"
  | "plus"
  | "v-ellipsis";

export class IconCtrl extends Ctrl {
  component = Icon;
  name = state<IconNames>();
}

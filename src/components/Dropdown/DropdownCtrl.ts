import { Ctrl } from "@spoonkit/Ctrl";
import { state } from "@spoonkit/signals/State";
import { Dropdown } from "./Dropdown";
import { ButtonCtrl } from "@components/Button/ButtonCtrl";

export type DropdownPosition = "top" | "bottom" | "left" | "right";

export type DropdownAlign = "start" | "center" | "end";

export interface DropdownItem {
  label: string;
  disabled?: boolean;
  onClick: (() => void) | null;
}

export class DropdownCtrl extends Ctrl {
  component? = Dropdown;
  button = state<ButtonCtrl>();
  items = state<DropdownItem[]>([]);
  position = state<DropdownPosition>("bottom");
  align = state<DropdownAlign | undefined>(undefined);
  hover = state<boolean>(false);
  open = state<boolean>(false);
}

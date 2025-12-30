import { Ctrl } from "@spoonkit/Ctrl";
import { emitter } from "@spoonkit/signals/Emitter";
import { state } from "@spoonkit/signals/State";
import { Button } from "./Button";
import { IconCtrl } from "@components/Icon/IconCtrl";

export type ButtonColors =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

export type ButtonStyles = "outline" | "dash" | "soft" | "ghost" | "link";
export type ButtonSizes = "xs" | "sm" | "md" | "lg" | "xl";

export class ButtonCtrl extends Ctrl {
  component? = Button;
  color = state<ButtonColors>("neutral");
  style = state<ButtonStyles>();
  size = state<ButtonSizes>("md");
  label = state<string>();
  leftIcon = state<IconCtrl>();
  onClick = emitter<void>();
}

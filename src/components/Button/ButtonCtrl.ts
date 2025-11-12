import { Ctrl } from "@spoonkit/Ctrl";
import { emitter } from "@spoonkit/signals/Emitter";
import { state } from "@spoonkit/signals/State";
import { Button } from "./Button";

export class ButtonCtrl extends Ctrl {
  component? = Button;
  label = state<string>();
  onClick = emitter<void>();
}

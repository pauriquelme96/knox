import { Ctrl } from "@spoon-kit-legacy/controller/Ctrl";
import { emitter } from "@spoon-kit-legacy/signals/Emitter";
import { state } from "@spoon-kit-legacy/signals/State";

export class ButtonCtrl extends Ctrl {
  label = state<string>();
  onClick = emitter<void>();
}

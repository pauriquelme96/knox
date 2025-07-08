import { Ctrl } from "@spoon-kit-legacy/controller/Ctrl";
import { emitter } from "@spoon-kit-legacy/signals/Emitter";
import { state } from "@spoon-kit-legacy/signals/State";

export class InputCtrl<T> extends Ctrl {
  value = state<T>();
  type = state<string>("text");
  placeholder = state<string>("...");
  onChange = emitter<T>();
}

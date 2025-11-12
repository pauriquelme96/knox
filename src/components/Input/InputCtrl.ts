import { Ctrl } from "@spoonkit/Ctrl";
import { emitter } from "@spoonkit/signals/Emitter";
import { state } from "@spoonkit/signals/State";
import { Input } from "./Input";

export class InputCtrl<T> extends Ctrl {
  component? = Input;
  value = state<T>();
  type = state<string>("text");
  placeholder = state<string>("...");
  onChange = emitter<T>();
}

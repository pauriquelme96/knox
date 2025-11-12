import { Ctrl } from "@spoonkit/Ctrl";
import { state } from "@spoonkit/signals/State";

export class TextLabelCtrl extends Ctrl {
  text = state<string>();
}

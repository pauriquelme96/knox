import { Ctrl } from "@spoonkit/Ctrl";
import { emitter } from "@spoonkit/signals/Emitter";
import { state } from "@spoonkit/signals/State";
import { Dialog } from "./Dialog";

export class DialogCtrl extends Ctrl {
  component? = Dialog;
  public title = state<string>("");
  public onOpen = emitter<void>();
  public onClose = emitter<void>();

  public open() {
    this.onOpen.next();
  }

  public close() {
    this.onClose.next();
  }
}

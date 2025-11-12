import { Ctrl } from "@spoonkit/Ctrl";
import { emitter } from "@spoonkit/signals/Emitter";
import { state } from "@spoonkit/signals/State";

export class DialogCtrl extends Ctrl {
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

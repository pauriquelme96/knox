import { Ctrl } from "@spoon-kit-legacy/controller/Ctrl";
import { emitter } from "@spoon-kit-legacy/signals/Emitter";
import { state } from "@spoon-kit-legacy/signals/State";

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

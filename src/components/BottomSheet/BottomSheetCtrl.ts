import { Ctrl } from "@spoonkit/Ctrl";
import { emitter } from "@spoonkit/signals/Emitter";
import { state } from "@spoonkit/signals/State";

export class BottomSheetCtrl extends Ctrl {
  public title = state<string>();
  public onOpen = emitter<void>();
  public onClose = emitter<void>();

  public open(..._args: any[]) {
    this.onOpen.next();
  }

  public close() {
    this.onClose.next();
  }
}

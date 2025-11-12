import { ButtonCtrl } from "src/components/Button/ButtonCtrl";
import { DialogCtrl } from "src/components/Dialog/DialogCtrl";
import { InputCtrl } from "src/components/Input/InputCtrl";
import { TransactionEntity } from "src/domain/Transaction/TransactionEntity";
import { TransactionDialog } from "./TransactionDialog";

export class TransactionDialogCtrl extends DialogCtrl {
  component? = TransactionDialog;
  descriptionInput = new InputCtrl<string>().set({
    type: "text",
    placeholder: "Description...",
  });

  amountInput = new InputCtrl<number>().set({
    type: "number",
    placeholder: "Amount...",
  });

  save = new ButtonCtrl().set({
    label: "Save",
  });

  public createTransaction(): Promise<boolean> {
    const entity = new TransactionEntity();
    const defer = createPromise<boolean>();

    // INIT INPUTS
    this.descriptionInput.set({ value: entity.model.description });
    this.amountInput.set({ value: entity.model.amount });

    // INIT EVENTS
    this.save.onClick.subscribe(() => {
      entity.save();
      defer.resolve(true);
      this.close();
    });

    this.onClose.subscribe(() => {
      defer.resolve(false);
    });

    // OPEN DIALOG
    this.open();

    return defer.promise;
  }
}

export type DeferredPromise<T> = ReturnType<typeof createPromise<T>>;

export function createPromise<T>() {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

import { ButtonCtrl } from "src/components/Button/ButtonCtrl";
import { DialogCtrl } from "src/components/Dialog/DialogCtrl";
import { InputCtrl } from "src/components/Input/InputCtrl";
import { TransactionEntity } from "src/domain/Transaction/TransactionEntity";
import { TransactionDialog } from "./TransactionDialog";
import { deferPromise, DeferredPromise } from "src/utils/deferredPromise";

export class TransactionDialogCtrl extends DialogCtrl {
  component? = TransactionDialog;

  private transaction: TransactionEntity = null;
  private defer: DeferredPromise<boolean>;

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
    onClick: () => {
      this.transaction.save();
      this.defer.resolve(true);
      this.close();
    },
  });

  constructor() {
    super();
    this.onClose.subscribe(() => {
      if (this.defer) {
        this.defer.resolve(false);
      }
      this.defer = null;
      this.transaction = null;
    });
  }

  public open(transaction: TransactionEntity): Promise<boolean> {
    this.transaction = transaction;
    this.defer = deferPromise<boolean>();
    const { description, amount } = transaction.model;

    this.descriptionInput.set({ value: description });
    this.amountInput.set({ value: amount });

    super.open();

    return this.defer.promise;
  }
}

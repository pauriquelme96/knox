import { Ctrl } from "@spoon-kit-legacy/controller/Ctrl";
import { provide } from "@spoon-kit-legacy/providers/providers";
import { ButtonCtrl } from "src/components/Button/ButtonCtrl";
import { InputCtrl } from "src/components/Input/InputCtrl";
import { TransactionModel } from "src/domain/Transaction/TransactionModel";
import { TransactionStore } from "src/domain/Transaction/TransactionStore";

export class TransactionsPageCtrl extends Ctrl {
  private transactionStore = provide(TransactionStore);

  private transactionList = this.transactionStore.createList();
  private transactionModel = new TransactionModel();

  list = this.transactionList.map((transaction) => transaction.get());

  descriptionInput = new InputCtrl<string>().set({
    type: "text",
    placeholder: "Description...",
    value: this.transactionModel.description,
  });

  amountInput = new InputCtrl<number>().set({
    type: "number",
    placeholder: "Amount...",
    value: this.transactionModel.amount,
  });

  save = new ButtonCtrl().set({
    label: "Save",
    onClick: async () => {
      const entity = this.transactionStore.createEntity({
        amount: this.transactionModel.amount.get(),
        description: this.transactionModel.description.get(),
      });

      await entity.save();
      this.transactionList.push(entity);

      this.transactionModel.amount.set(null);
      this.transactionModel.description.set(null);
    },
  });

  ctrlStart() {
    this.transactionList.fetch();
  }
}

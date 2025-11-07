import { Ctrl } from "@spoon-kit-legacy/controller/Ctrl";
import { provide } from "@spoon-kit-legacy/providers/providers";
import { TransactionStore } from "src/domain/Transaction/TransactionStore";
import { TransactionDialogCtrl } from "./transaction-dialog/TransactionDialogCtrl";
import { ButtonCtrl } from "src/components/Button/ButtonCtrl";

export class TransactionsPageCtrl extends Ctrl {
  private transactionStore = provide(TransactionStore);

  private transactionList = this.transactionStore.createList();

  public transactionDialog = new TransactionDialogCtrl().set({
    title: "Transaction Dialog",
  });

  public openDialogButton = new ButtonCtrl().set({
    label: "New Transaction",
    onClick: async () => {
      await this.transactionDialog.createTransaction();
      alert("Refresh the page");
    },
  });

  list = this.transactionList.map((transaction) => transaction.get());

  ctrlStart() {
    this.transactionList.fetch();
  }
}

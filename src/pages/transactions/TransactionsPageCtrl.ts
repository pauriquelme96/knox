import { Ctrl } from "@spoonkit/Ctrl";
import { TransactionDialogCtrl } from "./transaction-dialog/TransactionDialogCtrl";
import { ButtonCtrl } from "src/components/Button/ButtonCtrl";
import { state } from "@spoonkit/signals/State";
import { TransactionEntity } from "src/domain/Transaction/TransactionEntity";
import { provide } from "@spoonkit/provider";
import { TransactionApi } from "src/domain/Transaction/TransactionApi";

export class TransactionsPageCtrl extends Ctrl {
  private api = provide(TransactionApi);
  public list = state<TransactionEntity[]>([]);

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

  ctrlStart() {
    const transactions = this.api.list();
    this.list.set(transactions.map((data) => new TransactionEntity(data)));
  }
}

import { Ctrl } from "@spoonkit/Ctrl";
import { TransactionDialogCtrl } from "./transaction-dialog/TransactionDialogCtrl";
import { ButtonCtrl } from "src/components/Button/ButtonCtrl";
import { state } from "@spoonkit/signals/State";
import { TransactionEntity } from "src/domain/Transaction/TransactionEntity";
import { provide } from "@spoonkit/provider";
import { TransactionApi } from "src/domain/Transaction/TransactionApi";
import { TextLabelCtrl } from "@components/TextLabel/TextLabelCtrl";
import { calc } from "@spoonkit/signals/Calc";

export class TransactionsPageCtrl extends Ctrl {
  private api = provide(TransactionApi);
  public list = state<
    {
      description: TextLabelCtrl;
      amount: TextLabelCtrl;
      entity: TransactionEntity;
    }[]
  >([]);

  public transactionDialog = new TransactionDialogCtrl().set({
    title: "Transaction Dialog",
  });

  public openDialogButton = new ButtonCtrl().set({
    label: "New Transaction",
    onClick: async () => {
      const created = await this.transactionDialog.open(
        new TransactionEntity()
      );

      if (created) this.fetchData();
    },
  });

  ctrlStart() {
    this.fetchData();
  }

  private buildRow(transaction: TransactionEntity) {
    const { description, amount } = transaction.model;

    return {
      description: new TextLabelCtrl().set({
        text: description,
      }),
      amount: new TextLabelCtrl().set({
        text: calc(() => `${amount.get().toFixed(2)} €`),
      }),
      entity: transaction,
    };
  }

  private fetchData() {
    const transactions = this.api.list();
    this.list.set(
      transactions.map((data) => this.buildRow(new TransactionEntity(data)))
    );
  }

  public onClickTransaction(transaction: TransactionEntity) {
    this.transactionDialog.open(transaction);
    //this.fetchData();
  }
}

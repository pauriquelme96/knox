import { DockCtrl } from "@components/Dock/DockCtrl";
import { IconCtrl } from "@components/Icon/IconCtrl";
import { TransactionDialogCtrl } from "@pages/transactions/transaction-dialog/TransactionDialogCtrl";
import { Ctrl } from "@spoonkit/Ctrl";

export class HomeCtrl extends Ctrl {
  public transactionDialog = new TransactionDialogCtrl().set({
    title: "Transaction Dialog",
  });

  public dock = new DockCtrl().set({
    items: [
      {
        label: "Home",
        icon: new IconCtrl().set({ name: "house" }),
        onClick: () => {
          console.log("Home clicked");
        },
      },
      {
        label: "Planning",
        icon: new IconCtrl().set({ name: "landmark" }),
        onClick: () => {
          console.log("Planning clicked");
        },
      },
    ],
  });

  ctrlStart() {
    //this.transactionDialog.open(new TransactionEntity());
  }
}

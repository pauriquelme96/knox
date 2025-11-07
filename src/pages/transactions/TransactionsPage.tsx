import { useCtrl } from "@spoon-kit-react/useCtrl";
import { TransactionsPageCtrl } from "./TransactionsPageCtrl";
import { Fragment } from "react/jsx-runtime";
import { useRegister } from "@spoon-kit-react/useRegister";
import { TransactionStore } from "src/domain/Transaction/TransactionStore";
import { TransactionApi } from "src/domain/Transaction/TransactionApi";
import { TransactionDialogCtrl } from "./transaction-dialog/TransactionDialogCtrl";
import { TransactionDialog } from "./transaction-dialog/TransactionDialog";
import { Button } from "src/components/Button/Button";
import { Dialog } from "src/components/Dialog/Dialog";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function TransactionsPage() {
  useRegister(TransactionApi, new TransactionApi());
  useRegister(TransactionStore, new TransactionStore());
  useRegister(TransactionDialogCtrl, TransactionDialog);

  const { self, state } = useCtrl(TransactionsPageCtrl);

  return (
    <div>
      <Dialog ctrl={self.transactionDialog} />
      <Button ctrl={self.openDialogButton}></Button>
      <div className="h-5"></div>
      {state.list.map((transaction, i) => (
        <Fragment key={transaction._id}>
          {i !== 0 && <hr className="my-4" />}
          <div
            className="grid grid-cols-[1fr_auto] gap-2"
            key={transaction._id}
          >
            <p className="text-gray-500 col-span-2">
              {formatDate(transaction.date)}
            </p>
            <p>{transaction.description}</p>
            <p className={transaction.amount > 0 ? "text-green-600" : ""}>
              {transaction.amount}
            </p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

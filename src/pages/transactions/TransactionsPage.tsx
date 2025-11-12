import { useCtrl } from "@spoonkit/useCtrl";
import { TransactionsPageCtrl } from "./TransactionsPageCtrl";
import { Fragment } from "react/jsx-runtime";
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
  const { self } = useCtrl(TransactionsPageCtrl);

  return (
    <div>
      <Dialog ctrl={self.transactionDialog} />
      <Button ctrl={self.openDialogButton}></Button>
      <div className="h-5"></div>
      {self.list.get().map((transaction, i) => (
        <Fragment key={transaction.model._id.get()}>
          {i !== 0 && <hr className="my-4" />}
          <div
            className="grid grid-cols-[1fr_auto] gap-2"
            key={transaction.model._id.get()}
          >
            <p className="text-gray-500 col-span-2">
              {formatDate(transaction.model.date.get())}
            </p>
            <p>{transaction.model.description.get()}</p>
            <p
              className={
                transaction.model.amount.get() > 0 ? "text-green-600" : ""
              }
            >
              {transaction.model.amount.get()?.toFixed(2)} €
            </p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

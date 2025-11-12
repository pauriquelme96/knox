import { useCtrl } from "@spoonkit/useCtrl";
import { TransactionsPageCtrl } from "./TransactionsPageCtrl";
import { Fragment } from "react/jsx-runtime";
import { Button } from "src/components/Button/Button";
import { Dialog } from "src/components/Dialog/Dialog";
import { TextLabel } from "@components/TextLabel/TextLabel";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function TransactionsPage() {
  const { self } = useCtrl(TransactionsPageCtrl);

  return (
    <div>
      <Dialog ctrl={self.transactionDialog} />
      <Button ctrl={self.openDialogButton}></Button>
      <div className="h-5"></div>
      {self.list.get().map((row, i) => (
        <Fragment key={row.entity.model._id.get()}>
          {i !== 0 && <hr className="my-4" />}
          <div
            className="grid grid-cols-[1fr_auto] gap-2"
            onClick={() => self.onClickTransaction(row.entity)}
            key={row.entity.model._id.get()}
          >
            <p className="text-gray-500 col-span-2">
              {formatDate(row.entity.model.date.get())}
            </p>
            <TextLabel ctrl={row.description} />
            <TextLabel ctrl={row.amount} />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

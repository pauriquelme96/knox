import { useCtrl } from "@spoon-kit-react/useCtrl";
import { TransactionsPageCtrl } from "./TransactionsPageCtrl";
import { Input } from "src/components/Input/Input";
import { Button } from "src/components/Button/Button";
import { Fragment } from "react/jsx-runtime";
import { useRegister } from "@spoon-kit-react/useRegister";
import { TransactionStore } from "src/domain/Transaction/TransactionStore";
import { TransactionApi } from "src/domain/Transaction/TransactionApi";

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

  const { self, state } = useCtrl(TransactionsPageCtrl);

  return (
    <div>
      <h2>Add movement</h2>
      <div className="flex gap-2">
        <Input ctrl={self.amountInput} />
        <div className="w-full">
          <Input ctrl={self.descriptionInput} />
        </div>
        <Button ctrl={self.save} />
      </div>
      <div className="h-5"></div>
      {state.list.map((transaction, i) => (
        <Fragment key={transaction._id}>
          {i !== 0 && <hr className="my-4" />}
          <div
            className="grid grid-cols-[1fr_auto] gap-2"
            key={transaction._id}
          >
            <p className="text-gray-500 col-span-2">{transaction.date}</p>
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

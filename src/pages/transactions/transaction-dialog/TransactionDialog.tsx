import { useCtrl } from "@spoonkit/useCtrl";
import { TransactionDialogCtrl } from "./TransactionDialogCtrl";
import { Input } from "src/components/Input/Input";
import { Button } from "src/components/Button/Button";

export function TransactionDialog() {
  const { self } = useCtrl(TransactionDialogCtrl);

  return (
    <div className="flex flex-col gap-2">
      <Input ctrl={self.amountInput} />
      <div className="w-full">
        <Input ctrl={self.descriptionInput} />
      </div>
      <Button ctrl={self.save} />
    </div>
  );
}

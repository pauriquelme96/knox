import { createTransactionModel, iTransaction } from "./TransactionModel";
import { provide } from "@spoon-kit-legacy/providers/providers";
import { TransactionApi } from "./TransactionApi";
import { createTransactionValidator } from "./TransactionValidator";

export class TransactionEntity {
  private api = provide(TransactionApi);
  model = createTransactionModel();
  validator = createTransactionValidator(this.model);

  constructor(transactionData?: iTransaction) {
    if (transactionData) this.model.set(transactionData);
  }

  save() {
    const hasErrors = !this.validator.isValid.get();
    if (hasErrors) throw new Error("Transaction data is invalid. Cannot save.");

    const response = this.model._id.get()
      ? this.api.update(this.model._id.get(), this.model.get())
      : this.api.create(this.model.get());

    this.model.set(response);
  }
}

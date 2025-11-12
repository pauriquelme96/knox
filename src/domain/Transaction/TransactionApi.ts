import { LocalStorageClient } from "src/services/LocalStorageClient";
import { iTransaction } from "./TransactionModel";

export class TransactionApi {
  private api = new LocalStorageClient<iTransaction>("transactions");

  create(transaction: iTransaction): iTransaction {
    return this.api.create({ ...transaction, date: new Date().toISOString() });
  }

  update(_id: string, updatedTransaction: iTransaction): iTransaction {
    return this.api.update(_id, updatedTransaction);
  }

  list(): iTransaction[] {
    const transactions = this.api.list();
    return transactions.map((t) => ({
      ...t,
      date: new Date(t.date).toISOString(),
      amount: Number(t.amount),
    }));
  }
}

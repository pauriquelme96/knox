import { LocalStorageClient } from "src/services/LocalStorageClient";
import { iTransaction } from "./TransactionModel";

export class TransactionApi {
  private api = new LocalStorageClient<iTransaction>("transactions");

  create(transaction: iTransaction): iTransaction {
    return this.api.create(transaction);
  }

  update(_id: string, updatedTransaction: iTransaction): iTransaction {
    return this.api.update(_id, updatedTransaction);
  }

  list(): iTransaction[] {
    return this.api.list();
  }
}

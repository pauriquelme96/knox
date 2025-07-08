import { Entity } from "@spoon-kit-legacy/domain/Entity";
import { TransactionModel } from "./TransactionModel";
import { provide } from "@spoon-kit-legacy/providers/providers";
import { TransactionApi } from "./TransactionApi";

export class TransactionEntity extends Entity<TransactionModel> {
  private api = provide(TransactionApi);
  model = new TransactionModel();

  save() {
    return this.commit(async (values) => {
      const response = this.isLocal.get()
        ? this.api.create(values)
        : this.api.update(values._id, values);

      return response;
    });
  }
}

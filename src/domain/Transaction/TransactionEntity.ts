import { Entity } from "@spoon-kit-legacy/domain/Entity";
import { TransactionModel } from "./TransactionModel";
import { provide } from "@spoon-kit-legacy/providers/providers";
import { TransactionApi } from "./TransactionApi";

declare const toAccountEntity: any;
export class TransactionEntity extends Entity<TransactionModel> {
  private api = provide(TransactionApi);
  model = new TransactionModel();

  //account = toAccountEntity({ _id: this.model.account_id });
  //account = calc(() => this.api.getAccount(this.model.account_id.get()));
  async account() {
    const result = await this.api.getAccount(this.model.account_id.get());
    return toAccountEntity(result);
  }

  save() {
    return this.commit(async (values) => {
      const response = this.isLocal.get()
        ? this.api.create(values)
        : this.api.update(values._id, values);

      return response;
    });
  }
}

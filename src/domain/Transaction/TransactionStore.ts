import { EntityStore } from "@spoon-kit-legacy/domain/EntityStore";
import { TransactionEntity } from "./TransactionEntity";
import { iTransaction } from "./TransactionModel";
import { TransactionList } from "./TransactionList";

export class TransactionStore extends EntityStore<TransactionEntity> {
  protected buildEntity(): TransactionEntity {
    return new TransactionEntity();
  }

  protected generateKey(values: iTransaction): string {
    return values._id;
  }

  createEntity(values: iTransaction = {}) {
    return this.resolve(values);
  }

  createList(): TransactionList {
    return new TransactionList(this);
  }
}

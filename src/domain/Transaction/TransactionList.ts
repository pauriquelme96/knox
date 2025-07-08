import { EntityList } from "@spoon-kit-legacy/domain/EntityList";
import { TransactionEntity } from "./TransactionEntity";
import { provide } from "@spoon-kit-legacy/providers/providers";
import { TransactionApi } from "./TransactionApi";

export class TransactionList extends EntityList<TransactionEntity> {
  private api = provide(TransactionApi);

  public fetch() {
    const transactions = this.api.list();
    this.set(transactions);
  }
}

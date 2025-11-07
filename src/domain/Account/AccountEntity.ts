import { Entity } from "@spoon-kit-legacy/domain/Entity";
import { AccountModel } from "./AccountModel";

export class AccountEntity extends Entity<AccountModel> {
  model = new AccountModel();
}

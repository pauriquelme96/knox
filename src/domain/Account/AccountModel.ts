import { field } from "@spoon-kit-legacy/domain/Field";
import { ModelValues } from "@spoon-kit-legacy/types/ModelTypes";

export type iAccount = ModelValues<AccountModel>;

export class AccountModel {
  _id = field<string>();
  name = field<string>();
  type = field<"loan" | "savings">;
  balance = field<number>();
}

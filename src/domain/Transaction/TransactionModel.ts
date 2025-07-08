import { field } from "@spoon-kit-legacy/domain/Field";
import { ModelValues } from "@spoon-kit-legacy/types/ModelTypes";

export type iTransaction = ModelValues<TransactionModel>;

export class TransactionModel {
  _id = field<string>();
  amount = field<number>();
  date = field<string>();
  description = field<string>();
  account_id = field<string>();
  forecast_id = field<string>();
}

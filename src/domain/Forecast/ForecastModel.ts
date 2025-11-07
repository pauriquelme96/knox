import { field } from "@spoon-kit-legacy/domain/Field";

declare const ref: any;
declare const toUserEntity: any;

export class ForecastModel {
  _id = field<string>();
  name = field<string>();

  user_id = field<string>();

  transactions = field<
    {
      amount: number;
      description: string;
      account_id: string;
    }[]
  >();

  budget = field<
    {
      name: string;
      amount: number;
      balance: number;
      transaction_ids: string[];
    }[]
  >();
}

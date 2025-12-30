import { monitor } from "@spoonkit/signals/Monitor";
import { TransactionModel } from "./TransactionModel";
import { $untracked } from "@spoonkit/signals/$untracked";
import { State } from "@spoonkit/signals/State";
import { $batch } from "@spoonkit/signals/$batch";

export const initFormatTransaction = (model: TransactionModel) => {
  const { description, amount } = model;

  // DESCRIPTION
  format(description, (current, set) => {
    set(current?.trim().replace(/\s+/g, " "));
  });

  // AMOUNT
  format(amount, (current, set) => {
    if (Number.isNaN(Number(current))) return;
    set(typeof current === "number" ? current : Number(current));
  });

  // DATE
  /*format(date, (current, set) => {
    if (current instanceof Date) return;
    set(new Date(current));
  });*/
};

function toNumber(current: any, set: (newValue: number) => void) {
  const num = Number(current);
  Number.isNaN(num) ? set(null) : set(num);
}

function toDate(value: any): Date {
  if (value instanceof Date) return value;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

type InferValue<T> = T extends State<infer U> ? U : never;
export function format<T extends State<any>>(
  state: T,
  ...formatFns: ((
    value: InferValue<T>,
    setValue: (newValue: InferValue<T>) => void
  ) => void)[]
) {
  monitor(() => {
    const value = state.get();

    $batch(() => {
      $untracked(() => {
        formatFns.forEach((formatFn) =>
          formatFn(value, (newValue) => state.set(newValue))
        );
      });
    });
  });
}

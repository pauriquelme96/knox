import { Infer } from "@spoonkit/Infer";
import { state } from "@spoonkit/signals/State";
import { stateArray } from "@spoonkit/signals/stateArray";
import { stateObject } from "@spoonkit/signals/stateObject";

export type iPlaning = Infer<typeof PlaningModel>;
export type PlaningModel = ReturnType<typeof PlaningModel>;

export const PlaningModel = () =>
  stateObject({
    _id: state<string>(),
    name: state<string>(),
    definition: stateArray(() =>
      stateObject({
        type: state<"fixed" | "variable">(),
        concept: state<string>(),
        description: state<string>(),
        effective_date: state<Date>(),
        amount: state<number>(),
        category: state<string>(),
        transaction_id: state<string>(),
      })
    ),
  });

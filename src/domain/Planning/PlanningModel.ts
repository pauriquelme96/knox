import { Infer } from "@spoonkit/Infer";
import { state } from "@spoonkit/signals/State";
import { stateArray } from "@spoonkit/signals/stateArray";
import { stateObject } from "@spoonkit/signals/stateObject";

export type iPlanning = Infer<typeof PlanningModel>;
export type PlanningModel = ReturnType<typeof PlanningModel>;

export const PlanningModel = () =>
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

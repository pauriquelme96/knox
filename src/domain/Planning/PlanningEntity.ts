import { provide } from "@spoonkit/provider";
import { PlanningApi } from "./PlanningApi";
import { iPlanning, PlanningModel } from "./PlanningModel";

export class PlanningEntity {
  private api = provide(PlanningApi);
  model = PlanningModel();

  constructor(planningData?: iPlanning) {
    if (planningData) this.model.set(planningData);
  }

  save() {
    const response = this.model._id.get()
      ? this.api.update(this.model._id.get(), this.model.get())
      : this.api.create(this.model.get());

    this.model.set(response);
  }

  drop() {
    if (!this.model._id.get())
      throw new Error("Cannot delete a non-existing planning.");

    this.api.remove(this.model._id.get());
  }
}

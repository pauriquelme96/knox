import { provide } from "@spoonkit/provider";
import { PlaningApi } from "./PlaningApi";
import { iPlaning, PlaningModel } from "./PlaningModel";

export class PlaningEntity {
  private api = provide(PlaningApi);
  model = PlaningModel();

  constructor(planingData?: iPlaning) {
    if (planingData) this.model.set(planingData);
  }

  save() {
    const response = this.model._id.get()
      ? this.api.update(this.model._id.get(), this.model.get())
      : this.api.create(this.model.get());

    this.model.set(response);
  }

  drop() {
    if (!this.model._id.get())
      throw new Error("Cannot delete a non-existing planing.");

    this.api.remove(this.model._id.get());
  }
}

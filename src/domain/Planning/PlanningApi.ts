import { LocalStorageClient } from "@services/LocalStorageClient";
import { iPlanning } from "./PlanningModel";

export class PlanningApi {
  private api = new LocalStorageClient<any>("planning");

  create(planning: Omit<iPlanning, "_id">): any {
    return this.api.create(planning);
  }

  list(): iPlanning[] {
    return this.api.list();
  }

  remove(_id: string) {
    this.api.remove(_id);
  }

  update(_id: string, updatedPlanning: iPlanning): any {
    return this.api.update(_id, updatedPlanning);
  }
}

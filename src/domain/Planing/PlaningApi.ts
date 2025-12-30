import { LocalStorageClient } from "@services/LocalStorageClient";
import { iPlaning } from "./PlaningModel";

export class PlaningApi {
  private api = new LocalStorageClient<any>("planing");

  create(planing: Omit<iPlaning, "_id">): any {
    return this.api.create(planing);
  }

  list(): iPlaning[] {
    return this.api.list();
  }

  remove(_id: string) {
    this.api.remove(_id);
  }

  update(_id: string, updatedPlaning: iPlaning): any {
    return this.api.update(_id, updatedPlaning);
  }
}

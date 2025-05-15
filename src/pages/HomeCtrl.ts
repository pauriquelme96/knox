import { Ctrl } from "@spoon-kit-legacy/controller/Ctrl";
import { provide } from "@spoon-kit-legacy/providers/providers";
import { state } from "@spoon-kit-legacy/signals/State";
import { ApiClient } from "src/providers/ApiClient/ApiClient";

export class HomeCtrl extends Ctrl {
  private apiClient: ApiClient = provide(ApiClient);

  public movements = state([
    {
      id: "1",
      amount: 100,
      date: new Date().toISOString(),
      description: "Compra en tienda",
    },
    {
      id: "2",
      amount: -50,
      date: new Date().toISOString(),
      description: "Pago de factura",
    },
  ]);

  async ctrlStart() {}
}

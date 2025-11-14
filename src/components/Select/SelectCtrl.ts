import { Ctrl } from "@spoonkit/Ctrl";
import { Select } from "./Select";
import { state } from "@spoonkit/signals/State";
import { emitter } from "@spoonkit/signals/Emitter";

export class SelectCtrl<T, V> extends Ctrl {
  component? = Select;

  public label = state<string>("");
  public value = state<V>();
  public options = state<T[]>([]);
  public labelKey = state<keyof T>(null);
  public valueKey = state<keyof T>(null);
  public placeholder = state<string>("Selecciona una opción");
  public disabled = state<boolean>(false);
  public error = state<string>("");
  public onChange = emitter<V>();
  public loading = state<boolean>(false);
}

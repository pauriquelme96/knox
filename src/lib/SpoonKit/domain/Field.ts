import { equal } from "../helpers/equals";
import { calc } from "../signals/Calc";
import { State, state } from "../signals/State";
import { FieldValidation } from "../types/FieldTypes";

export function field<T>(init?: FieldConf<T>) {
  return new Field<T>(init);
}

interface FieldConf<T> {
  value?: T;
  map?: (value: T) => T;
}

export interface FieldOptions {
  mode: "commit" | "remote" | "local";
}

export class Field<T> extends State<T> {
  // INTERNAL STATE
  private hasChanges = state(false);
  private localValue = state<T>();
  private remoteValue = state<T>();
  private value = calc(() => {
    return this.hasChanges.get()
      ? this.localValue.get()
      : this.remoteValue.get();
  });

  // PUBLIC STATE
  public errors = state<string[]>([]);
  public isValid = calc(() => this.errors.get().length === 0);
  public isDirty = calc(() => {
    return this.hasChanges.get()
      ? !equal(this.localValue.get(), this.remoteValue.get())
      : false;
  });

  constructor(private conf: FieldConf<T> = {}) {
    super();
    super.set(this.value);
    this.set(conf.value, { mode: "commit" });
  }

  public set(value: T, options?: FieldOptions) {
    options = options || { mode: "local" };
    if (value === undefined) return;
    if (this.conf.map) value = this.conf.map(value);

    switch (options.mode) {
      case "commit":
        this.remoteValue.set(value);
        this.discard();
        break;
      case "remote":
        this.remoteValue.set(value);
        break;
      case "local":
        this.localValue.set(value);
        this.hasChanges.set(true);
        break;
    }

    return this;
  }

  public validate(...rules: FieldValidation<T>[]): void {
    const errors = rules
      .map((validationFn) => validationFn(this))
      .filter((error) => error !== null);

    this.errors.set(errors);
  }

  public discard() {
    this.localValue.set(null);
    this.errors.set([]);
    this.hasChanges.set(false);
  }
}

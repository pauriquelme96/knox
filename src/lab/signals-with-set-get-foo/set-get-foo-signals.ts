import { isPlainObject } from "@spoon-kit-legacy/helpers/isPlainObject";
import { $batch } from "@spoon-kit-legacy/signals/$batch";
import { Calc } from "@spoon-kit-legacy/signals/Calc";
import { state, State } from "@spoon-kit-legacy/signals/State";
import { createReactiveArray } from "src/lab/signals-with-set-get-foo/ReactiveArray";

type Primitive = string | number | boolean | null | undefined | symbol | bigint;
type Model<T> = T extends Primitive
  ? State<T>
  : T extends Array<infer U>
  ? Model<U>[]
  : T extends Record<string, any>
  ? { [K in keyof T]: Model<T[K]> }
  : never;

type Infer<T extends Model<any>> = T extends State<infer U>
  ? U
  : T extends Array<infer U>
  ? Infer<U>[]
  : T extends Record<string, any>
  ? { [K in keyof T]: Infer<T[K]> }
  : never;

// push, assign

export function get<T extends Model<any>>(container: T | Calc<any>): Infer<T> {
  if (container instanceof Calc) container = container.get();

  if (Array.isArray(container)) {
    return container.map((item) => get(item)) as Infer<T>;
  } else if (isPlainObject(container)) {
    const result: any = {};
    Object.keys(container).forEach((key) => {
      result[key] = get(container[key]);
    });
    return result;
  } else if (container instanceof State) {
    return container.get();
  } else {
    return container as Infer<T>;
  }
}

export function set<T extends Model<any>>(container: T, values: Infer<T>) {
  $batch(() => {
    if (Array.isArray(container)) {
      container.length = values.length;

      values.forEach((v, i) => {
        if (!container[i]) container[i] = model(v);
        set(container[i], v);
      });
    } else if (isPlainObject(container)) {
      Object.keys(values).forEach((key) => {
        if (!container[key]) container[key] = model(values[key]);
        set(container[key], values[key]);
      });
    } else {
      (container as State<any>).set(values);
    }
  });

  return container;
}

export function assign<T extends Model<any>>(
  container: T,
  values: Partial<Infer<T>>
) {
  return set(container, values as Infer<T>);
}

export function model<T>(values: T): Model<T> {
  if (Array.isArray(values)) {
    const reactiveArray = createReactiveArray(values.map((v) => model(v)));
    return reactiveArray as Model<T>;
  } else if (isPlainObject(values)) {
    const result: any = {};
    Object.keys(values).forEach((key) => {
      result[key] = model(values[key]);
    });
    return result;
  } else {
    return state(values) as Model<T>;
  }
}

export function push<T extends Model<any>[]>(
  container: T,
  value: Infer<T[number]>
) {
  (container as any).push(model(value));
}

import { state, State } from "@spoonkit/signals/State";
import { $batch } from "@spoonkit/signals/$batch";
import { isPlainObject } from "@spoonkit/isPlainObject";

// ============================================================================
// SÍMBOLOS INTERNOS (metadata oculta en el proxy)
// ============================================================================

const REACTIVE_STATE_MAP = Symbol("reactiveStateMap");
const REACTIVE_RAW = Symbol("reactiveRaw");
const IS_REACTIVE = Symbol("isReactive");

// ============================================================================
// HELPERS
// ============================================================================

function isPrimitive(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "symbol" ||
    typeof value === "bigint"
  );
}

// ============================================================================
// UTILIDADES PÚBLICAS
// ============================================================================

export function isReactive(value: any): boolean {
  return value?.[IS_REACTIVE] === true;
}

export function toRaw<T>(value: T): T {
  return isReactive(value) ? value[REACTIVE_RAW] : value;
}

export function getState<T>(
  reactiveObj: any,
  prop: string | symbol
): State<T> | undefined {
  return reactiveObj?.[REACTIVE_STATE_MAP]?.get(prop);
}

// ============================================================================
// MÉTODOS DE ARRAY QUE MODIFICAN
// ============================================================================

const MUTATING_METHODS = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
  "fill",
  "copyWithin",
] as const;

// ============================================================================
// CREAR OBJETO REACTIVO
// ============================================================================

function createReactiveObject<T extends object>(obj: T): T {
  // Map para almacenar: nombrePropiedad → State<primitivo> | ProxyReactivo
  const stateMap = new Map<string | symbol, State<any> | any>();

  // Map para notifiers de objetos/arrays (detectan reemplazos completos)
  const changeNotifiers = new Map<string | symbol, State<number>>();

  // Inicializar States para primitivos, Proxies para objetos/arrays
  for (const key in obj) {
    const value = obj[key];

    if (isPrimitive(value)) {
      // Primitivo → State directo
      stateMap.set(key, state(value));
    } else {
      // Objeto/Array → Solo Proxy reactivo (sin State wrapper)
      const reactiveValue = reactive(value);
      stateMap.set(key, reactiveValue);
      // Notifier para detectar reemplazo completo de este objeto/array
      changeNotifiers.set(key, state(0));
    }
  }

  // Crear Proxy
  const proxy = new Proxy(obj, {
    get(target, prop, receiver) {
      // Símbolos internos
      if (prop === REACTIVE_STATE_MAP) return stateMap;
      if (prop === REACTIVE_RAW) return target;
      if (prop === IS_REACTIVE) return true;

      // Obtener del stateMap
      const stateValue = stateMap.get(prop);
      if (stateValue) {
        // Si es un State (primitivo)
        if (stateValue instanceof State) {
          return stateValue.get(); // ← Registra dependencia reactiva
        }

        // Si es un objeto/array reactivo (Proxy)
        if (isReactive(stateValue)) {
          // Registrar dependencia del change notifier (detecta reemplazos)
          const notifier = changeNotifiers.get(prop);
          notifier?.get();

          return stateValue; // ← Devolver el Proxy directamente
        }

        // Fallback: devolver el valor tal cual
        return stateValue;
      }

      // Propiedades no rastreadas (métodos, etc.)
      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, value, receiver) {
      // Obtener o crear State/Proxy para esta propiedad
      let stateValue = stateMap.get(prop);

      if (!stateValue) {
        // Nueva propiedad
        if (isPrimitive(value)) {
          stateMap.set(prop, state(value));
        } else {
          // Objeto/Array nuevo → Solo Proxy
          const reactiveValue = reactive(value);
          stateMap.set(prop, reactiveValue);
          changeNotifiers.set(prop, state(0));
        }
      } else {
        // Actualizar existente
        if (stateValue instanceof State) {
          // Es primitivo → usar State.set()
          stateValue.set(value); // ← Dispara reactividad
        } else {
          // Es objeto/array → reemplazo completo
          const reactiveValue = isPrimitive(value) ? value : reactive(value);
          stateMap.set(prop, isPrimitive(value) ? state(value) : reactiveValue);

          // Disparar el notifier para detectar el reemplazo
          const notifier = changeNotifiers.get(prop);
          if (notifier) {
            notifier.set(notifier.get() + 1); // ← Dispara reactividad de reemplazo
          } else if (!isPrimitive(value)) {
            // Si ahora es objeto pero antes era primitivo, crear notifier
            changeNotifiers.set(prop, state(0));
          }
        }
      }

      // Actualizar también el target raw
      Reflect.set(target, prop, value, receiver);
      return true;
    },

    deleteProperty(target, prop) {
      // Eliminar el State/Proxy asociado
      const stateValue = stateMap.get(prop);
      if (stateValue) {
        stateMap.delete(prop);

        // Si es un State, notificar cambio
        if (stateValue instanceof State) {
          stateValue.set(undefined);
        }

        // Si tiene notifier, dispararlo
        const notifier = changeNotifiers.get(prop);
        if (notifier) {
          changeNotifiers.delete(prop);
          notifier.set(notifier.get() + 1);
        }
      }

      return Reflect.deleteProperty(target, prop);
    },
  });

  return proxy as T;
}

// ============================================================================
// CREAR ARRAY REACTIVO
// ============================================================================

function createReactiveArray<T>(arr: T[]): T[] {
  // Array para almacenar: State<primitivo> | ProxyReactivo por elemento
  const itemStates: (State<any> | any)[] = [];

  // Array de notifiers para elementos que son objetos/arrays
  const itemNotifiers: (State<number> | undefined)[] = [];

  // Inicializar states/proxies para elementos existentes
  arr.forEach((item, index) => {
    if (isPrimitive(item)) {
      itemStates[index] = state(item);
      itemNotifiers[index] = undefined;
    } else {
      // Objeto/Array → Solo Proxy
      itemStates[index] = reactive(item);
      itemNotifiers[index] = state(0); // Notifier para detectar reemplazo
    }
  });

  // State para notificar cambios estructurales (length, orden)
  const changeNotifier = state(0);

  const proxy = new Proxy(arr, {
    get(target, prop, receiver) {
      // Símbolos internos
      if (prop === REACTIVE_STATE_MAP) return itemStates;
      if (prop === REACTIVE_RAW) return target;
      if (prop === IS_REACTIVE) return true;

      // Acceso a índice numérico
      if (typeof prop === "string" && !isNaN(Number(prop))) {
        const index = Number(prop);
        const itemState = itemStates[index];

        if (itemState !== undefined) {
          // Si es un State (primitivo)
          if (itemState instanceof State) {
            return itemState.get(); // ← Registra dependencia
          }

          // Si es un objeto/array reactivo (Proxy)
          if (isReactive(itemState)) {
            // Registrar dependencia del notifier (detecta reemplazos)
            const notifier = itemNotifiers[index];
            notifier?.get();

            return itemState; // ← Devolver el Proxy directamente
          }

          return itemState;
        }
        return undefined;
      }

      // length también reactivo
      if (prop === "length") {
        changeNotifier.get(); // Registra dependencia
        return target.length;
      }

      // Métodos mutadores
      if (typeof prop === "string" && MUTATING_METHODS.includes(prop as any)) {
        return function (...args: any[]) {
          let result: any;

          $batch(() => {
            // Ejecutar el método original
            result = (target as any)[prop](...args);

            // Actualizar itemStates según el método
            switch (prop) {
              case "push": {
                // args son los nuevos elementos
                args.forEach((item) => {
                  if (isPrimitive(item)) {
                    itemStates.push(state(item));
                    itemNotifiers.push(undefined);
                  } else {
                    itemStates.push(reactive(item));
                    itemNotifiers.push(state(0));
                  }
                });
                break;
              }

              case "pop": {
                itemStates.pop();
                itemNotifiers.pop();
                break;
              }

              case "shift": {
                itemStates.shift();
                itemNotifiers.shift();
                break;
              }

              case "unshift": {
                // Insertar al inicio
                args.forEach((item) => {
                  if (isPrimitive(item)) {
                    itemStates.unshift(state(item));
                    itemNotifiers.unshift(undefined);
                  } else {
                    itemStates.unshift(reactive(item));
                    itemNotifiers.unshift(state(0));
                  }
                });
                break;
              }

              case "splice": {
                const [start, deleteCount = 0, ...items] = args;
                // Eliminar states y notifiers
                itemStates.splice(start, deleteCount);
                itemNotifiers.splice(start, deleteCount);
                // Insertar nuevos states y notifiers
                items.forEach((item, offset) => {
                  if (isPrimitive(item)) {
                    itemStates.splice(start + offset, 0, state(item));
                    itemNotifiers.splice(start + offset, 0, undefined);
                  } else {
                    itemStates.splice(start + offset, 0, reactive(item));
                    itemNotifiers.splice(start + offset, 0, state(0));
                  }
                });
                break;
              }

              case "sort":
              case "reverse": {
                // Reordenar los states y notifiers según el nuevo orden
                const newStates: (State<any> | any)[] = [];
                const newNotifiers: (State<number> | undefined)[] = [];
                target.forEach((_, index) => {
                  newStates[index] = itemStates[index];
                  newNotifiers[index] = itemNotifiers[index];
                });
                itemStates.length = 0;
                itemStates.push(...newStates);
                itemNotifiers.length = 0;
                itemNotifiers.push(...newNotifiers);
                break;
              }

              case "fill": {
                const [value, start = 0, end = target.length] = args;
                for (let i = start; i < end; i++) {
                  const itemState = itemStates[i];
                  if (itemState) {
                    if (itemState instanceof State) {
                      // Era primitivo
                      if (isPrimitive(value)) {
                        itemState.set(value);
                      } else {
                        // Cambió a objeto
                        itemStates[i] = reactive(value);
                        itemNotifiers[i] = state(0);
                      }
                    } else {
                      // Era objeto/array
                      if (isPrimitive(value)) {
                        // Cambió a primitivo
                        itemStates[i] = state(value);
                        itemNotifiers[i] = undefined;
                      } else {
                        // Sigue siendo objeto → reemplazo
                        itemStates[i] = reactive(value);
                        const notifier = itemNotifiers[i];
                        if (notifier) {
                          notifier.set(notifier.get() + 1);
                        }
                      }
                    }
                  }
                }
                break;
              }

              case "copyWithin": {
                // Reordenar states y notifiers según copyWithin
                const newStates: (State<any> | any)[] = [];
                const newNotifiers: (State<number> | undefined)[] = [];
                target.forEach((_, index) => {
                  newStates[index] = itemStates[index];
                  newNotifiers[index] = itemNotifiers[index];
                });
                itemStates.length = 0;
                itemStates.push(...newStates);
                itemNotifiers.length = 0;
                itemNotifiers.push(...newNotifiers);
                break;
              }
            }

            // Notificar cambio estructural
            changeNotifier.set(changeNotifier.get() + 1);
          });

          return result;
        };
      }

      // Métodos no mutadores (map, filter, etc.)
      if (
        typeof prop === "string" &&
        typeof (target as any)[prop] === "function"
      ) {
        const originalMethod = (target as any)[prop];
        return function (...args: any[]) {
          // Registramos dependencia antes de ejecutar
          changeNotifier.get();
          // Leer todos los elementos para registrar dependencias
          target.forEach((_, index) => {
            const itemState = itemStates[index];
            if (itemState instanceof State) {
              itemState.get();
            } else if (isReactive(itemState)) {
              itemNotifiers[index]?.get();
            }
          });
          return originalMethod.apply(target, args);
        };
      }

      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, value, receiver) {
      if (typeof prop === "string" && !isNaN(Number(prop))) {
        const index = Number(prop);

        $batch(() => {
          const existingState = itemStates[index];

          if (!existingState) {
            // Nuevo elemento
            if (isPrimitive(value)) {
              itemStates[index] = state(value);
              itemNotifiers[index] = undefined;
            } else {
              itemStates[index] = reactive(value);
              itemNotifiers[index] = state(0);
            }
          } else {
            // Actualizar elemento existente
            if (existingState instanceof State) {
              // Era primitivo
              if (isPrimitive(value)) {
                existingState.set(value);
              } else {
                // Cambió de primitivo a objeto/array
                itemStates[index] = reactive(value);
                itemNotifiers[index] = state(0);
              }
            } else {
              // Era objeto/array → reemplazo
              if (isPrimitive(value)) {
                // Cambió de objeto a primitivo
                itemStates[index] = state(value);
                itemNotifiers[index] = undefined;
              } else {
                // Sigue siendo objeto/array
                itemStates[index] = reactive(value);
                const notifier = itemNotifiers[index];
                if (notifier) {
                  notifier.set(notifier.get() + 1);
                } else {
                  itemNotifiers[index] = state(0);
                }
              }
            }
          }

          // Actualizar el array original
          Reflect.set(target, prop, value, receiver);

          // Notificar cambio
          changeNotifier.set(changeNotifier.get() + 1);
        });

        return true;
      }

      // Para length u otras propiedades
      if (prop === "length") {
        const newLength = value as number;
        const oldLength = target.length;

        // Si se reduce el tamaño, eliminar states y notifiers sobrantes
        if (newLength < oldLength) {
          itemStates.splice(newLength, oldLength - newLength);
          itemNotifiers.splice(newLength, oldLength - newLength);
        }

        const result = Reflect.set(target, prop, value, receiver);
        changeNotifier.set(changeNotifier.get() + 1);
        return result;
      }

      return Reflect.set(target, prop, value, receiver);
    },
  });

  return proxy;
}

// ============================================================================
// FUNCIÓN PRINCIPAL: REACTIVE
// ============================================================================

export function reactive<T>(initialValue: T): T {
  // 1. Si ya es reactivo, retornar tal cual
  if (isReactive(initialValue)) {
    return initialValue;
  }

  // 2. Si es primitivo, no se puede hacer reactivo directamente
  // (necesitaría estar dentro de un objeto o array)
  if (isPrimitive(initialValue)) {
    console.warn(
      "reactive() no puede hacer reactivos valores primitivos directamente. Usa state() o envuélvelo en un objeto."
    );
    return initialValue;
  }

  // 3. Si es array → createReactiveArray()
  if (Array.isArray(initialValue)) {
    return createReactiveArray(initialValue) as T;
  }

  // 4. Si es objeto plano → createReactiveObject()
  if (isPlainObject(initialValue)) {
    return createReactiveObject(initialValue as object) as T;
  }

  // 5. Otros casos (clases, funciones, etc.) - no soportados por ahora
  console.warn("reactive() solo soporta objetos planos y arrays por ahora");
  return initialValue;
}

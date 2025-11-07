import { state } from "@spoon-kit-legacy/signals/State";
import { $batch } from "@spoon-kit-legacy/signals/$batch";

// Métodos que modifican el array y deben disparar reactividad
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

export function createReactiveArray<T>(initialArray: T[]): T[] {
  // Estado interno que se actualiza cuando el array cambia
  const changeNotifier = state(0);

  // Proxy que intercepta operaciones en el array
  const proxy = new Proxy(initialArray, {
    get(target, prop, receiver) {
      // Si es un método mutador, lo interceptamos
      if (typeof prop === "string" && MUTATING_METHODS.includes(prop as any)) {
        return function (...args: any[]) {
          // Ejecutamos el método original
          const result = target[prop].apply(target, args);

          // Notificamos el cambio
          $batch(() => {
            changeNotifier.set(changeNotifier.get() + 1);
          });

          return result;
        };
      }

      // Para propiedades de lectura como length, accedemos al notificador
      // para registrar dependencias reactivas
      if (
        prop === "length" ||
        (typeof prop === "string" && !isNaN(Number(prop)))
      ) {
        // Accedemos al notificador para crear dependencia reactiva
        changeNotifier.get();
      }

      // Para métodos no mutadores (filter, map, etc.), también registramos dependencia
      if (
        typeof prop === "string" &&
        typeof (target as any)[prop] === "function"
      ) {
        const originalMethod = (target as any)[prop];
        if (!MUTATING_METHODS.includes(prop as any)) {
          return function (...args: any[]) {
            // Registramos dependencia antes de ejecutar
            changeNotifier.get();
            return originalMethod.apply(target, args);
          };
        }
      }

      // Para acceso directo a índices o propiedades
      if (typeof prop === "string" && !isNaN(Number(prop))) {
        changeNotifier.get();
      }

      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, value, receiver) {
      const result = Reflect.set(target, prop, value, receiver);

      // Si se modifica un índice o length, notificamos
      if (
        prop === "length" ||
        (typeof prop === "string" && !isNaN(Number(prop)))
      ) {
        $batch(() => {
          changeNotifier.set(changeNotifier.get() + 1);
        });
      }

      return result;
    },
  });

  return proxy;
}

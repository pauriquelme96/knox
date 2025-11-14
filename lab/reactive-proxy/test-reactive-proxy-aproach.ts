import { monitor } from "@spoonkit/signals/Monitor";
import { reactive, isReactive, toRaw, getState } from "./ReactiveProxy";

console.log("=".repeat(80));
console.log("TESTING REACTIVE PROXY APPROACH");
console.log("=".repeat(80));

// ============================================================================
// TEST 1: OBJETO SIMPLE CON PROPIEDADES PRIMITIVAS
// ============================================================================

console.log("\n📦 TEST 1: Objeto simple con primitivos");

const user = reactive({
  name: "John",
  age: 25,
  active: true,
});

console.log("✓ Usuario creado:", {
  name: user.name,
  age: user.age,
  active: user.active,
});
console.log("✓ Es reactivo:", isReactive(user));

// Monitor que se ejecuta cuando cambia name o age
let monitorExecutions = 0;
const dispose = monitor(() => {
  monitorExecutions++;
  console.log(
    `  → Monitor ejecutado (#${monitorExecutions}):`,
    user.name,
    user.age
  );
});

// Cambiar propiedades (debe disparar el monitor)
console.log("\n🔄 Cambiando name...");
user.name = "Jane";

console.log("🔄 Cambiando age...");
user.age = 26;

console.log("🔄 Cambiando active (no está en el monitor)...");
user.active = false;

console.log("\n✓ Valores finales:", {
  name: user.name,
  age: user.age,
  active: user.active,
});
console.log("✓ Total ejecuciones del monitor:", monitorExecutions);

dispose(); // Limpiar

// ============================================================================
// TEST 2: OBJETO ANIDADO
// ============================================================================

console.log("\n\n📦 TEST 2: Objetos anidados");

const person = reactive({
  name: "Alice",
  address: {
    city: "NYC",
    zip: 10001,
    coords: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
});

console.log("✓ Persona creada:", {
  name: person.name,
  city: person.address.city,
  lat: person.address.coords.lat,
});

let nestedMonitorCount = 0;
const disposeNested = monitor(() => {
  nestedMonitorCount++;
  console.log(
    `  → Monitor anidado (#${nestedMonitorCount}):`,
    person.address.city,
    person.address.coords.lat
  );
});

console.log("\n🔄 Cambiando ciudad...");
person.address.city = "LA";

console.log("🔄 Cambiando latitud...");
person.address.coords.lat = 34.0522;

console.log("\n✓ Objeto anidado es reactivo:", isReactive(person.address));
console.log(
  "✓ Objeto profundo es reactivo:",
  isReactive(person.address.coords)
);

disposeNested();

// ============================================================================
// TEST 3: ARRAYS SIMPLES
// ============================================================================

console.log("\n\n📦 TEST 3: Arrays de primitivos");

const numbers = reactive([1, 2, 3]);

console.log("✓ Array creado:", [...numbers]);
console.log("✓ Es reactivo:", isReactive(numbers));

let arrayMonitorCount = 0;
const disposeArray = monitor(() => {
  arrayMonitorCount++;
  console.log(`  → Monitor array (#${arrayMonitorCount}):`, {
    length: numbers.length,
    first: numbers[0],
    sum: numbers.reduce((a, b) => a + b, 0),
  });
});

console.log("\n🔄 Push 4...");
numbers.push(4);

console.log("🔄 Modificar índice [0]...");
numbers[0] = 10;

console.log("🔄 Pop...");
numbers.pop();

console.log("\n✓ Array final:", [...numbers]);

disposeArray();

// ============================================================================
// TEST 4: ARRAY DE OBJETOS
// ============================================================================

console.log("\n\n📦 TEST 4: Array de objetos");

interface Message {
  text: string;
  user: string;
  timestamp: number;
}

const messages = reactive<Message[]>([
  { text: "Hello", user: "John", timestamp: 1 },
  { text: "World", user: "Jane", timestamp: 2 },
]);

console.log("✓ Mensajes creados:", messages.length);

let messagesMonitorCount = 0;
const disposeMessages = monitor(() => {
  messagesMonitorCount++;
  console.log(`  → Monitor mensajes (#${messagesMonitorCount}):`, {
    count: messages.length,
    firstText: messages[0]?.text,
    firstUser: messages[0]?.user,
  });
});

console.log("\n🔄 Modificar texto del primer mensaje...");
messages[0].text = "Hello World!";

console.log("🔄 Agregar nuevo mensaje...");
messages.push({ text: "New message", user: "Bob", timestamp: 3 });

console.log("🔄 Modificar usuario del segundo mensaje...");
messages[1].user = "Janet";

console.log(
  "\n✓ Mensajes finales:",
  messages.map((m) => ({ text: m.text, user: m.user }))
);

disposeMessages();

// ============================================================================
// TEST 5: PROPIEDADES DINÁMICAS
// ============================================================================

console.log("\n\n📦 TEST 5: Propiedades dinámicas");

const config = reactive<Record<string, any>>({
  theme: "dark",
});

console.log("✓ Config inicial:", { ...config });

let configMonitorCount = 0;
const disposeConfig = monitor(() => {
  configMonitorCount++;
  console.log(`  → Monitor config (#${configMonitorCount}):`, {
    theme: config.theme,
    language: config.language,
    fontSize: config.fontSize,
  });
});

console.log("\n🔄 Agregar nueva propiedad 'language'...");
config.language = "es";

console.log("🔄 Agregar 'fontSize'...");
config.fontSize = 14;

console.log("🔄 Modificar 'theme'...");
config.theme = "light";

console.log("\n✓ Config final:", { ...config });

disposeConfig();

// ============================================================================
// TEST 6: UTILIDADES (toRaw, getState)
// ============================================================================

console.log("\n\n📦 TEST 6: Utilidades");

const data = reactive({
  value: 42,
});

console.log("✓ Valor reactivo:", data.value);
console.log("✓ toRaw:", toRaw(data));
console.log("✓ getState('value'):", getState(data, "value"));

const valueState = getState(data, "value");
if (valueState) {
  console.log("✓ State.get():", valueState.get());
  console.log("🔄 State.set(100)...");
  valueState.set(100);
  console.log("✓ Nuevo valor a través del proxy:", data.value);
}

// ============================================================================
// TEST 7: CASO COMPLEJO - APP STATE
// ============================================================================

console.log("\n\n📦 TEST 7: Caso complejo - App State");

interface AppState {
  user: {
    name: string;
    email: string;
  };
  settings: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  todos: Array<{
    id: number;
    text: string;
    completed: boolean;
  }>;
}

const appState = reactive<AppState>({
  user: {
    name: "Admin",
    email: "admin@example.com",
  },
  settings: {
    theme: "dark",
    notifications: true,
  },
  todos: [
    { id: 1, text: "Implementar reactive proxy", completed: true },
    { id: 2, text: "Testing", completed: false },
  ],
});

console.log("✓ App state creado");

let appMonitorCount = 0;
const disposeApp = monitor(() => {
  appMonitorCount++;
  const completedCount = appState.todos.filter((t) => t.completed).length;
  console.log(`  → Monitor app (#${appMonitorCount}):`, {
    user: appState.user.name,
    theme: appState.settings.theme,
    todos: `${completedCount}/${appState.todos.length} completados`,
  });
});

console.log("\n🔄 Cambiar nombre de usuario...");
appState.user.name = "SuperAdmin";

console.log("🔄 Cambiar tema...");
appState.settings.theme = "light";

console.log("🔄 Completar segundo todo...");
appState.todos[1].completed = true;

console.log("🔄 Agregar nuevo todo...");
appState.todos.push({ id: 3, text: "Deploy", completed: false });

console.log("\n✓ Estado final del app:");
console.log("  - Usuario:", appState.user);
console.log("  - Settings:", appState.settings);
console.log("  - Todos:", appState.todos);

disposeApp();

// ============================================================================
// RESUMEN
// ============================================================================

console.log("\n" + "=".repeat(80));
console.log("✅ TODOS LOS TESTS COMPLETADOS");
console.log("=".repeat(80));

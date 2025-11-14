import { createReactiveArray } from "./ReactiveArray";
import { calc } from "@spoonkit/signals/Calc";
import { monitor } from "@spoonkit/signals/Monitor";

// Ejemplo de uso
interface Message {
  message: string;
  user: {
    name: string;
    age: number;
  };
}

// Crear array reactivo
const messages = createReactiveArray<Message>([]);

// Test de compatibilidad
console.log("Es instanceof Array:", messages instanceof Array); // true
console.log("Tiene métodos de array:", typeof messages.push === "function"); // true
console.log("Length inicial:", messages.length); // 0

// Crear cálculo reactivo
const user1Messages = calc(() => {
  console.log("🔄 Recalculando user1Messages...");
  return messages.filter((msg) => msg.user.name === "User1");
});

// Monitor para ver cambios
monitor(() => {
  console.log("📊 User1 Messages count:", user1Messages.get().length);
});

// Test 1: Añadir elementos
console.log("\n--- Test 1: Push ---");
messages.push({
  message: "Hello world!",
  user: { name: "User1", age: 25 },
});

messages.push({
  message: "Managing state is fun!",
  user: { name: "User2", age: 28 },
});

// Test 2: Añadir más elementos de User1
console.log("\n--- Test 2: Más push ---");
messages.push({
  message: "New message from User1",
  user: { name: "User1", age: 22 },
});

// Test 3: Usar splice
console.log("\n--- Test 3: Splice ---");
messages.splice(1, 1); // Eliminar el mensaje de User2

// Test 4: Modificar por índice
console.log("\n--- Test 4: Modificar por índice ---");
if (messages[0]) {
  messages[0] = {
    message: "Modified message",
    user: { name: "User1", age: 30 },
  };
}

// Test 5: Verificar que otros métodos funcionan
console.log("\n--- Test 5: Métodos no mutadores ---");
const allMessages = messages.map((m) => m.message);
console.log("Todos los mensajes:", allMessages);

export { messages };

## OBJETOS

```typescript
interface User {
  name: string;
  email: string;
}

const user = createSignal<User>();

user.name; // undefined

monitor(() => {
  console.log(user.name); // undefined
});
```

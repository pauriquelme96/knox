import { model, set, push } from "./set-get-foo-signals";

interface Message {
  message: string;
  user: {
    name: string;
    age: number;
  };
}

const messages = model<Message[]>([]);

set(messages, [
  {
    message: "Hello world!",
    user: {
      name: "User1",
      age: 25,
    },
  },
  {
    message: "Managing state is fun!",
    user: {
      name: "User2",
      age: 28,
    },
  },
]);

push(messages, {
  message: "New message added",
  user: {
    name: "User1",
    age: 22,
  },
});

set(messages[0], {
  message: "Updated message",
  user: {
    name: "User1",
    age: 26,
  },
});

set(messages[1], {
  message: "Hello again!",
  user: {
    name: "User2",
    age: 26,
  },
});

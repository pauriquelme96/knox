import { useCtrl } from "@spoonkit/useCtrl";
import { ButtonCtrl } from "./ButtonCtrl";

export function Button({ ctrl }: { ctrl: ButtonCtrl }) {
  const { state, self } = useCtrl(ctrl);

  return <button onClick={() => self.onClick.next()}>{state.label}</button>;
}

import { useCtrl } from "@spoon-kit-react/useCtrl";
import { ButtonCtrl } from "./ButtonCtrl";

export function Button({ ctrl }: { ctrl: ButtonCtrl }) {
  const { state, self } = useCtrl(ctrl);

  return <button onClick={() => self.onClick.next()}>{state.label}</button>;
}

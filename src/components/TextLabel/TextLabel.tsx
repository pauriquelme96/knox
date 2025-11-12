import { useCtrl } from "@spoonkit/useCtrl";
import { TextLabelCtrl } from "./TextLabelCtrl";

export function TextLabel({ ctrl }: { ctrl: TextLabelCtrl }) {
  const { self } = useCtrl(ctrl);

  return <p>{self.text.get()}</p>;
}

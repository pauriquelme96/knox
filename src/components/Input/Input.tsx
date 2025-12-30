import { useCtrl } from "@spoonkit/useCtrl";
import { InputCtrl } from "./InputCtrl";

export function Input({ ctrl }: { ctrl: InputCtrl<any> }) {
  const { self } = useCtrl(ctrl);

  return (
    <div>
      <input
        className="w-full input"
        type={self.type.get()}
        value={self.value.get() ?? ""}
        placeholder={self.placeholder.get()}
        onChange={(e) => self.value.set(e.target.value)}
      />
    </div>
  );
}

import { useCtrl } from "@spoon-kit-react/useCtrl";
import { InputCtrl } from "./InputCtrl";

export function Input({ ctrl }: { ctrl: InputCtrl<any> }) {
  const { state, setState } = useCtrl(ctrl);

  return (
    <div>
      <input
        className="w-full"
        type={state.type}
        value={state.value ?? ""}
        placeholder={state.placeholder}
        onChange={(e) => setState({ value: e.target.value })}
      />
    </div>
  );
}

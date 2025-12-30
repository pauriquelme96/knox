import { useCtrl } from "@spoonkit/useCtrl";
import { ButtonCtrl } from "./ButtonCtrl";
import { Icon } from "@components/Icon/Icon";

export function Button({ ctrl }: { ctrl: ButtonCtrl }) {
  const { state, self } = useCtrl(ctrl);

  const className = [
    "btn",
    state.color && `btn-${state.color}`,
    state.style && `btn-${state.style}`,
    state.size && `btn-${state.size}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} onClick={() => self.onClick.next()}>
      {state.leftIcon && <Icon ctrl={state.leftIcon} />}
      {state.label}
    </button>
  );
}

import { useCtrl } from "@spoonkit/useCtrl";
import { DockCtrl } from "./DockCtrl";
import { Icon } from "@components/Icon/Icon";

export function Dock({ ctrl }: { ctrl: DockCtrl }) {
  const { self } = useCtrl(ctrl);

  return (
    <div className="dock dock-md">
      {self.items.get().map((item) => (
        <button key={item.label} onClick={item.onClick}>
          <Icon ctrl={item.icon} />
          <span className="dock-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

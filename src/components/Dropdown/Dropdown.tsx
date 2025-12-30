import { useCtrl } from "@spoonkit/useCtrl";
import { DropdownCtrl } from "./DropdownCtrl";
import { Button } from "@components/Button/Button";

export function Dropdown({ ctrl }: { ctrl: DropdownCtrl }) {
  const { state, self } = useCtrl(ctrl);

  const getPositionClass = () => {
    const position = state.position;
    if (!position) return "";
    return `dropdown-${position}`;
  };

  const getAlignClass = () => {
    const align = state.align;
    if (!align) return "";
    return `dropdown-${align}`;
  };

  const className = [
    "dropdown",
    getPositionClass(),
    getAlignClass(),
    state.hover && "dropdown-hover",
    state.open && "dropdown-open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <div tabIndex={0} role="button">
        {state.button && <Button ctrl={state.button} />}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {state.items?.map((item, index) => (
          <li key={index}>
            <a
              className={item.disabled ? "disabled" : ""}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick && item.onClick();
                }
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

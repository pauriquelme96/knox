import { useCtrl } from "@spoonkit/useCtrl";
import { NavbarCtrl } from "./NavbarCtrl";
import { ResolveCtrl } from "@spoonkit/ResolveCtrl";

export function Navbar({ ctrl }: { ctrl: NavbarCtrl }) {
  const { self } = useCtrl(ctrl);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        {self.leftSlot.get() && <ResolveCtrl ctrl={self.leftSlot.get()} />}
        <h1 className="btn btn-ghost text-xl text-left">{self.title.get()}</h1>
      </div>
      <div className="navbar-end">
        {self.rightSlot.get() && <ResolveCtrl ctrl={self.rightSlot.get()} />}
      </div>
    </div>
  );
}

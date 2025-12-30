import { Ctrl } from "@spoonkit/Ctrl";
import { state } from "@spoonkit/signals/State";
import { Navbar } from "./Navbar";

export class NavbarCtrl extends Ctrl {
  component? = Navbar;
  public title = state<string>();
  public leftSlot = state<Ctrl>();
  public rightSlot = state<Ctrl>();
}

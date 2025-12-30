import {
  ArrowLeft,
  ArrowLeftRight,
  ChevronLeft,
  EllipsisVertical,
  House,
  Landmark,
  PiggyBank,
  Plus,
} from "lucide-react";
import { IconCtrl } from "./IconCtrl";
import { useCtrl } from "@spoonkit/useCtrl.new";

export function Icon({ ctrl }: { ctrl: IconCtrl }) {
  const { self } = useCtrl(ctrl);

  switch (self.name.get()) {
    case "house":
      return <House className="size-[1.2em]" absoluteStrokeWidth={false} />;
    case "arrow-left":
      return <ArrowLeft />;
    case "arrow-left-right":
      return <ArrowLeftRight />;
    case "chevron-left":
      return <ChevronLeft />;
    case "landmark":
      return <Landmark />;
    case "piggy-bank":
      return <PiggyBank className="size-[1.2em]" />;
    case "plus":
      return <Plus />;
    case "v-ellipsis":
      return <EllipsisVertical />;
    default:
      return null;
  }
}

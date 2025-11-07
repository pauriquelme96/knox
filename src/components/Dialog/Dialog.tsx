import { useCtrl } from "@spoon-kit-react/useCtrl";
import { DialogCtrl } from "./DialogCtrl";
import { ResolveCtrl } from "@spoon-kit-react/ResolveCtrl";
import { useEffect, useRef } from "react";

export function Dialog({ ctrl }: { ctrl: DialogCtrl }) {
  const { state, self } = useCtrl(ctrl);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const disposeOpen = self.onOpen.subscribe(() => {
      dialogRef.current?.showModal();
    });

    const disposeClose = self.onClose.subscribe(() => {
      dialogRef.current?.close();
    });

    return () => {
      disposeOpen();
      disposeClose();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="m-auto">
      <header>{state.title}</header>
      <ResolveCtrl ctrl={ctrl} />
    </dialog>
  );
}

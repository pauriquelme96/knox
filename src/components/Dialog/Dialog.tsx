import { useCtrl } from "@spoonkit/useCtrl";
import { DialogCtrl } from "./DialogCtrl";
import { useEffect, useRef } from "react";
import { ResolveCtrl } from "@spoonkit/ResolveCtrl";

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

import { useCtrl } from "@spoonkit/useCtrl";
import { DialogCtrl } from "./DialogCtrl";
import { useEffect, useRef } from "react";
import { ResolveCtrl } from "@spoonkit/ResolveCtrl";

export function Dialog({ ctrl }: { ctrl: DialogCtrl }) {
  const { self } = useCtrl(ctrl);

  const modalId = useRef(
    `dialog_${Math.random().toString(36).substring(2, 15)}`
  );

  useEffect(() => {
    const dialog = document.getElementById(
      modalId.current
    ) as HTMLDialogElement;

    const disposeOpen = self.onOpen.subscribe(() => {
      dialog.showModal();
    });

    const disposeClose = self.onClose.subscribe(() => {
      dialog.close();
    });

    return () => {
      disposeOpen();
      disposeClose();
    };
  }, []);

  return (
    <dialog id={modalId.current} className="modal">
      <div className="modal-box">
        <button
          onClick={() => self.close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">{self.title.get()}</h3>
        <ResolveCtrl ctrl={ctrl} />
      </div>
    </dialog>
  );
}

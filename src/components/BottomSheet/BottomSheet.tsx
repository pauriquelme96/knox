import { useCtrl } from "@spoonkit/useCtrl";
import { BottomSheetCtrl } from "./BottomSheetCtrl";
import { useEffect, useState } from "react";
import { ResolveCtrl } from "@spoonkit/ResolveCtrl";

export function BottomSheet({ ctrl }: { ctrl: BottomSheetCtrl }) {
  const { self } = useCtrl(ctrl);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const disposeOpen = self.onOpen.subscribe(() => {
      setIsOpen(true);
    });

    const disposeClose = self.onClose.subscribe(() => {
      setIsOpen(false);
    });

    return () => {
      disposeOpen();
      disposeClose();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => self.close()}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
      />

      {/* Bottom Sheet Container */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
        <div className="bg-base-100 rounded-t-2xl shadow-xl max-h-[90vh] overflow-auto">
          {/* Handle visual */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-base-300 rounded-full" />
          </div>

          {/* Título y botón cerrar */}
          <div className="flex items-center justify-between px-6 pb-4">
            <h3 className="font-bold text-lg">{self.title.get()}</h3>
            <button
              onClick={() => self.close()}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          {/* Contenido */}
          <div className="px-6 pb-6">
            <ResolveCtrl ctrl={ctrl} />
          </div>
        </div>
      </div>
    </>
  );
}

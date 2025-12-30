import { useCtrl } from "@spoonkit/useCtrl";
import { PlaningDetailCtrl } from "./PlaningDetailCtrl";
import { Navbar } from "@components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export function PlaningDetail() {
  const { self } = useCtrl(PlaningDetailCtrl);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      self.planingId.set(id);
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-100">
      <Navbar ctrl={self.navbar} />
      <div className="mx-auto p-4">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <p className="text-gray-500">Detalle de la planificaci\u00f3n: {self.planingId.get()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

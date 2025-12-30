import { useCtrl } from "@spoonkit/useCtrl";
import { HomeCtrl } from "./HomeCtrl";
import { EllipsisVertical, Plus } from "lucide-react";
import { Dialog } from "@components/Dialog/Dialog";
import { useState } from "react";
import { Dock } from "@components/Dock/Dock";

export function Home() {
  const { self } = useCtrl(HomeCtrl);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-100">
      <Navbar />
      <Dialog ctrl={self.transactionDialog} />

      <div className="p-4 grid gap-4">
        <div className="flex gap-3 overflow-y-auto">
          <div className="bg-base-100 shadow-md rounded-2xl p-5 pb-3 pt-4 min-width-[140px]">
            <div className="flex flex-col items-center gap-2">
              <Knob />
              <div className="text-center">
                <p className="text-sm text-slate-500 mt-1">Dinero de mano</p>
                <p className="text-xs text-slate-500 italic">
                  -150€ esta semana
                </p>
              </div>
            </div>
          </div>
        </div>

        <ul className="list bg-base-100 rounded-2xl shadow-md">
          <li className="p-4 pb-2  opacity-60 tracking-wide">
            Entradas y salidas
          </li>

          <TransactionRow title="Alquiler" amount={-329} />
          <TransactionRow title="Luz" amount={-220} />
          <TransactionRow title="Hipoteca" amount={-200} />
          <TransactionRow title="Coche" amount={-363} />
          <TransactionRow title="Google" amount={-8.1} />
          <TransactionRow title="Youtube" amount={-25.99} />
          <TransactionRow title="Spotify" amount={-20.99} />
          <TransactionRow title="ClaudeAI" amount={-21.78} />
          <TransactionRow title="Curso Merche" amount={-60} />
          <TransactionRow title="Gas" amount={-21.1} />
          <TransactionRow title="Github" amount={-8.81} />
          <TransactionRow title="Limpieza" amount={-30} />
          <TransactionRow title="iCloud" amount={-2.99} />
          <TransactionRow title="Nómina" amount={2424.24} />
        </ul>
        <div className="h-20"></div>
        <div className="fab mb-12 hidden">
          {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-xl btn-circle btn-neutral"
          >
            <Plus className="size-[1.5em]" />
          </div>

          {/* buttons that show up when FAB is open */}
          <button className="btn btn-lg">Crear movimiento</button>
          <button className="btn btn-lg">Crear bolsa</button>
        </div>
      </div>

      <Dock ctrl={self.dock} />
    </div>
  );
}

function TransactionRow({ title, amount }: { title: string; amount: number }) {
  const [checked, setChecked] = useState(false);
  const compact = false;

  return (
    <li
      className={`list-row px-4 py-3 ${
        checked ? "line-through opacity-50 bg-slate-100" : ""
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className={`checkbox checkbox-sm ${checked ? "checkbox-info" : ""}`}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </div>

      <div
        className={`flex gap-3 items-center `}
        onClick={() => setChecked(!checked)}
      >
        <p className={`text-${compact ? "md" : "lg"} text-slate-600`}>
          {title}
        </p>
        <p className="text-xs uppercase font-semibold opacity-60">17/04/2025</p>
      </div>

      <div className="flex gap-4 items-center">
        <p
          className={`${compact ? "text-md" : "text-lg"}  ${
            amount < 0 ? "text-slate-400" : "text-success"
          }`}
        >
          {amount}€{" "}
        </p>
        <button className="btn -m-2 btn-sm btn-ghost btn-square text-slate-600">
          <EllipsisVertical size={18} />
        </button>
      </div>
    </li>
  );
}

function Knob() {
  return (
    <div className="relative size-[92px]">
      <div
        className="radial-progress absolute left-0 top-0 text-slate-100"
        style={
          {
            "--value": 100,
            "--size": "6rem",
            "--thickness": "0.5rem",
          } as React.CSSProperties
        }
        aria-valuenow={70}
        role="progressbar"
      ></div>
      <div
        className="radial-progress text-secondary absolute font-medium left-0 top-0"
        style={
          {
            "--value": 60,
            "--size": "6rem",
            "--thickness": "0.7rem",
          } as React.CSSProperties
        }
        aria-valuenow={70}
        role="progressbar"
      >
        1800,37€
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <h1 className="btn btn-ghost text-xl">Home</h1>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />{" "}
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />{" "}
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}

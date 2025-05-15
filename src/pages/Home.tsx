import { useCtrl } from "@spoon-kit-react/useCtrl";
import { HomeCtrl } from "./HomeCtrl";

export function Home() {
  const { state } = useCtrl(HomeCtrl);

  return (
    <div>
      {state.movements.map((mov) => (
        <div key={mov.id}>
          <p>{mov.description}</p>
          <p>{mov.amount}</p>
        </div>
      ))}
    </div>
  );
}

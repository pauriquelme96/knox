import { LocalStorageClient } from "./services/LocalStorageClient";
import { ApiClient } from "./providers/ApiClient/ApiClient";
import "./App.css";
import { useRegister } from "@spoon-kit-react/useRegister";
import { Home } from "./pages/home/Home";

function App() {
  useRegister(ApiClient, new LocalStorageClient());

  return <Home />;
}

export default App;

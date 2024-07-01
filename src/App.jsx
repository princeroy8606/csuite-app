import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthRoutes />
    </BrowserRouter>
  );
}

export default App;

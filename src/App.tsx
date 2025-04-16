import "./App.css";
import { ToastContainer } from "react-toastify";
import AppRouter from "./Router/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;

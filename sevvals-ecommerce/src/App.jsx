import { ToastContainer } from "react-toastify";
import "./App.css";
import PageContent from "./layouts/PageContent";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <PageContent />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
      />
    </>
  );
}

export default App;

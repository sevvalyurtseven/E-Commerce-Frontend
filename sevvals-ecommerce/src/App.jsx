import { ToastContainer } from "react-toastify";
import "./App.css";
import PageContent from "./layouts/PageContent";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "./api/api";
import { setUser } from "./store/actions/clientActions";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.client.user);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axiosInstance.get("/verify");
        dispatch(setUser(response.data));
      } catch (error) {
        console.error("Token verification failed", error);
        localStorage.removeItem("token");
        dispatch(setUser({ isLoggedIn: false }));
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button className="btn loading">Loading</button>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }
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

import { ToastContainer } from "react-toastify";
import "./App.css";
import PageContent from "./layouts/PageContent";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "./api/api";
import { setUser } from "./store/actions/clientActions";
import { fetchCategories } from "./store/actions/productActions";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch(); // Redux dispatch fonksiyonunu kullanmak için
  const [loading, setLoading] = useState(true); // Yükleme durumunu yönetmek için
  const user = useSelector((state) => state.client.user); // Kullanıcı durumunu almak için
  const location = useLocation(); // Şu anki URL konumunu almak için

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false); // Token yoksa yükleme durumunu false yap
        return;
      }
      try {
        const response = await axiosInstance.get("/verify");
        dispatch(setUser(response.data)); // Kullanıcıyı Redux'a kaydet
      } catch (error) {
        console.error("Token verification failed", error);
        localStorage.removeItem("token");
        dispatch(setUser({ isLoggedIn: false })); // Hata olursa kullanıcıyı çıkış yapmış olarak ayarla
      } finally {
        setLoading(false); // Yükleme durumunu false yap
      }
    };

    verifyToken();
    dispatch(fetchCategories()); // Kategorileri fetch et
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button className="btn loading">Loading</button>
      </div>
    );
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

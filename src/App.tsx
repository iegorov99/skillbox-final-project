import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GenrePage } from "./pages/GenresPage/GenrePage";
import { FilmPage } from "./pages/FilmPage/FilmPage";
import { GenreListPage } from "./pages/GenreListPage/GenreListPage";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { toggleIsAuth } from "./features/isAuthSlice";
import { toggleUserName } from "./features/userNameSlice";
import { AccountPage } from "./pages/AccountPage/AccaountPage";
import Api from "./api/api";
import { AnimatePresence } from "framer-motion";
import NotFoundPage from "./pages/NotFoundPage.tsx/NoteFoundPage";

function App() {
  const dispatch = useAppDispatch();

  const meQuery = useQuery({
    queryFn: Api.fetchMe,
    queryKey: ["profile"],
    retry: 0,
  }, Api.queryClient);

  useEffect(() => {
    if (meQuery.status === "success") {
      dispatch(toggleIsAuth(true));
      dispatch(toggleUserName(meQuery.data.name));
    } else if (meQuery.status === "error") {
      dispatch(toggleIsAuth(false));
    }
  }, [meQuery.status, dispatch]);

  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/genres" element={<GenrePage />} />
            <Route path="/film-page/:id" element={<FilmPage />} />
            <Route path="/genreList/:genre" element={<GenreListPage />} />
            <Route path="/user" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
   </AnimatePresence> 
  );
}

export default App;




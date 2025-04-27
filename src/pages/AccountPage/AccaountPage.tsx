import { useCallback, useEffect, useState } from "react";
import Icon from "../../Icon/Icon";
import { Movies } from "../../models";
import MoviesList from "../../components/MoviesList";
import { Loader } from "../../components/Loader";
import Api from "../../api/api";
import { User } from "../../models/user";
import { UserSettings } from "../../components/UserSettings";
import { motion } from "framer-motion";
import { Button } from "../../components/Button";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useWindowWidth } from "../../hooks/useWindowWidth";

export function AccountPage() {
  const [favorites, setFavorites] = useState<Movies>();
  const [user, setUser] = useState<User>();
  const [activeTab, setActiveTab] = useState<string>("favorites");
  const { width } = useWindowWidth();
  useDocumentTitle("Страница пользователя");

  const getData = useCallback(async (): Promise<void> => {
    const favorites = await Api.getFavorites();
    setFavorites(favorites);
  }, []);

  const getUser = useCallback(async (): Promise<void> => {
    const user = await Api.fetchMe();
    setUser(user);
  }, []);

  useEffect(() => {
    getData();
    getUser();
  }, [getData, getUser]);

  const handleRemoveFavorite = (id: string) => {
    if (favorites) {
      setFavorites(favorites.filter(movie => movie.id.toString() !== id));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "favorites":
        return (
          favorites ? <MoviesList className="user-page__favorites" data={favorites} type="favorites" onRemoveFavorite={handleRemoveFavorite}></MoviesList> : <Loader />
        );
      case "settings":
        return (
          user ? (
            <UserSettings user={user} />
          ) : <Loader />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div className="user-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.1 }}>
      <div className="container">
        <h1 className="visually-hidden">Страница пользователя</h1>
        <div className="user-page__wrapper">
          <h2 className="user-page__title">Мой аккаунт</h2>
          <div className="user-page__navigation">
            <Button className={`user-page__button ${activeTab === "favorites" ? "user-page__button--active" : ""}`} onClick={() => setActiveTab("favorites")}>
              <Icon id="favorite-icon" className="user-page__button-icon user-page__button-icon--favorite"></Icon>
              <span>{width < 767 ? "Избранное" : "Избранные фильмы"}</span>
            </Button>
            <Button className={`user-page__button ${activeTab === "settings" ? "user-page__button--active" : ""}`} onClick={() => setActiveTab("settings")}>
              <Icon id="user-icon-false" className="user-page__button-icon"></Icon>
              <span>{width < 767 ? "Настройки" : "Настройка аккаунта"}</span>
            </Button>
          </div>
          <div className="user-page__content" id="user-page__content">
            {renderContent()}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
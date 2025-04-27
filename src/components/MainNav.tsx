import { memo } from "react";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
import Icon from "../Icon/Icon";
import { Button } from "./Button";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal/Modal";
import { useModal } from "../hooks/useModal";
import { useWindowWidth } from "../hooks/useWindowWidth";

const MainNav = memo(() => {
  const { searchIsOpen, openModal, closeModal } = useModal();
  const { windowWidth } = useWindowWidth();
  return (
    windowWidth < 1024 ? (
      <div className="main-nav main-nav--mobile">
        <NavLink to={"/genres"} className="main-nav__link main-nav__link--mobile" aria-label="На страницу жанров">
          <Icon id="genres-icon" className="main-nav__link-icon" />
        </NavLink>
        <Button className="main-nav__search-btn" onClick={() => openModal("search")} aria-label="Кнопка поиска">
          <Icon id="search-icon" className="main-nav__search-btn-icon" />
        </Button>
        <AnimatePresence>
          {searchIsOpen && (
            <Modal className="main-nav__modal" isButton={false} onClose={() => closeModal("search")} type="search-mobile">
              <SearchInput></SearchInput>
            </Modal>
          )}
        </AnimatePresence>
      </div>) : (<div className="main-nav">
        <NavLink to={"/"} className={({ isActive }) => (isActive ? "main-nav__link main-nav__link--active" : "main-nav__link")}>Главная</NavLink>
        <NavLink to={"/genres"} className={({ isActive }) => (isActive ? "main-nav__link main-nav__link--active" : "main-nav__link")}>Жанры</NavLink>
        <SearchInput></SearchInput>
      </div>)
  );
});

export default MainNav;
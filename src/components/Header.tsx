import { Link, NavLink } from "react-router-dom";
import Icon from "../Icon/Icon";
import { Button } from "./Button";
import { AuthWindow } from "./AuthWindow";
import Modal from "./Modal/Modal";
import { useAppSelector } from "../app/hooks";
import { memo } from "react";
import { AnimatePresence } from "framer-motion";
import { useModal } from "../hooks/useModal";
import MainNav from "./MainNav";

const Header = memo(() => {
  const isAuth = useAppSelector((state) => state.isAuth);
  const userName = useAppSelector((state) => state.userName);
  const { modalIsOpen, openModal, closeModal } = useModal();
  
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo" to={"/"} aria-label="Ссылка на главную страницу">
            <img className="header__logo-icon" src="/src/Images/logo-icon.png" alt="логотип маруси" />
            <Icon id="logo-word" className="header__logo-word" />
          </Link>
          <MainNav />
          {isAuth ? (
            <>
              <NavLink to={"/user"} className={({ isActive }) => (isActive ? "main-nav__link main-nav__link--active" : "main-nav__link")}>{userName}</NavLink>
              <NavLink to={"/user"} className="main-nav__link main-nav__link--mobile" aria-label="Ссылку на страницу пользователя">
                <Icon id="user-icon-true" className="main-nav__link-icon" />
              </NavLink>
            </>
          ) :
            <>
              <Button className="header__btn" type="button" onClick={() => openModal("default")}>Войти</Button>
              <Button className="header__btn header__btn--mobile" type="button" onClick={() => openModal("default")} aria-label="Кнопка войти в аккаунт">
                <Icon id="user-icon-false" className="header__btn-icon" />
              </Button>
            </>
          }
          <AnimatePresence>
            {modalIsOpen && (
              <Modal className="header__modal" isButton={true} onClose={() => closeModal("default")}>
                <AuthWindow />
              </Modal>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
});

export default Header;
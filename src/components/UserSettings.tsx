import { useMutation } from "@tanstack/react-query";
import Icon from "../Icon/Icon";
import { User } from "../models/user";
import { capitalizeWords } from "../utils/capitalizeWords";
import { getUserInitials } from "../utils/getUserInitials";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { toggleIsAuth } from "../features/isAuthSlice";
import { toggleUserName } from "../features/userNameSlice";
import Api from "../api/api";
import { memo } from "react";

type TProps = {
  user: User
};

export const UserSettings = memo(({ user }: TProps) => {
  const dispatch = useAppDispatch();

  const logoutMutation = useMutation(
    {
      mutationFn: Api.logoutUser,
      onSuccess: () => {
        dispatch(toggleIsAuth(false));
        dispatch(toggleUserName(""));
        Api.queryClient.invalidateQueries({ queryKey: ["profile"] })
      }
    },
    Api.queryClient
  );

  const handleClick = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="user-page__settings">
      <div className="user-page__about">
        <div className="user-page__info">
          <span className="user-page__info-image">{getUserInitials(user.name, user.surname)}</span>
          <div className="user-page__info-inner">
            <span className="user-page__info-note">Имя Фамилия</span>
            <span className="user-page__info-text">{capitalizeWords(user.name)} {capitalizeWords(user.surname)}</span>
          </div>
        </div>
        <div className="user-page__info">
          <div className="user-page__info-image">
            <Icon className="user-page__info-image-icon" id="mail-icon"></Icon>
          </div>
          <div className="user-page__info-inner">
            <span className="user-page__info-note">Электронная почта</span>
            <span className="user-page__info-text">{user.email}</span>
          </div>
        </div>
      </div>
      <Link to={"/"} className="user-page__btn btn btn--blue" onClick={handleClick}>Выйти из аккаунта</Link>
    </div>
  )
});


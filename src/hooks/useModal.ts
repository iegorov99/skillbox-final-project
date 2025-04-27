import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleAuthType } from "../features/authSlice";
import { toggleisTreilerOpen } from "../features/isTreilerOpen";
import { toggleModalIsOpen } from "../features/modalIsOpenSlice";
import { toggleSearchIsOpen } from "../features/searchIsOpen";

type ModalType = "default" | "trailer" | "search" | null;

export const useModal = () => {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector(state => state.modalIsOpen);
  const isTreilerOpen = useAppSelector(state => state.isTreilerOpen);
  const searchIsOpen = useAppSelector((state) => state.searchIsOpen);

  const openModal = (type: ModalType) => {
    if (type === "default") dispatch(toggleModalIsOpen(true));
    else if (type === "trailer") dispatch(toggleisTreilerOpen(true));
    else if (type === "search") dispatch(toggleSearchIsOpen(true));
  };

  const closeModal = (type: ModalType) => {
    if (type === "default") {
      dispatch(toggleModalIsOpen(false));
      dispatch(toggleAuthType("login"));
    } else if (type === "trailer") dispatch(toggleisTreilerOpen(false));
    else if (type === "search") dispatch(toggleSearchIsOpen(false));
  };
  return { modalIsOpen, isTreilerOpen, searchIsOpen, openModal, closeModal };
};
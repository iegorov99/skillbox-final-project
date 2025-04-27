import { ReactNode } from "react";
import Icon from "../Icon/Icon"

type TProps = {
  children: ReactNode,
  className: string,
  idField: string,
  iconId: string,
  errorMessage?: string;
}

export function CustomInput({ children, className, idField, iconId, errorMessage}: TProps) {
  return (
    <div className={"custom-input " + className} id="search">
      {children}
      <label className="custom-input__label" htmlFor={idField}>
        <Icon id={iconId} className="custom-input__icon" />
      </label>
      {errorMessage && (
        <span className="form-field__error-text">{errorMessage}</span>
      )}
    </div>
  )
}
import { FC, HTMLAttributes, memo } from "react";
import { Loader } from "./Loader";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  className: string;
  type?: "submit" | "reset" | "button";
}

export const Button: FC<IButtonProps> = memo(({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  type,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={className}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
});
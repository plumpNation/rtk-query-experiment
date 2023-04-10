import { type FC, type ButtonHTMLAttributes } from "react";
import classNames from "classnames";

import "./Button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void,
}

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  ...props
}) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      className={classNames("button", {
        "button--primary": type === "submit" || type === "button",
        "button--reset": type === "reset"
      })}
      type={type}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
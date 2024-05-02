import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string | JSX.Element;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  size?: number;
  name?: string;
  type?: "button" | "submit" | "reset" | undefined;
  clipLoaderClassName?: string;
  icon?: JSX.Element;
}

export default function LoadingButton({
  onClick,
  title,
  loading,
  className,
  disabled,
  size,
  name,
  type,
  clipLoaderClassName,
  icon,
}: LoadingButtonProps) {
  return (
    <button
      className={`flex flex-row items-center justify-center rounded-lg bg-lightYellow ${className}`}
      onClick={onClick}
      disabled={disabled}
      name={name}
      type={type}
    >
      {loading ? (
        <ClipLoader
          size={size}
          loading={loading}
          color="black"
          aria-label="Loading Spinner"
          className={`${clipLoaderClassName}`}
        />
      ) : (
        <>
          <span className="flex items-center">
            {title}
            {icon && <span className="ml-1">{icon}</span>}
          </span>
        </>
      )}
    </button>
  );
}

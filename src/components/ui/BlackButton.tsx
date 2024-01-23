import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface BlackButtonProps {
  text: string;
  action: () => void;
  style?: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function BlackButton({
  text,
  action,
  style,
  loading = false,
  disabled = false,
}: BlackButtonProps) {
  return (
    <button
      type='submit'
      className={`input bg-black text-white transition-black-opacity flex items-center justify-center h-12 w-full ${style}`}
      onClick={() => action()}
      disabled={disabled}
    >
      {!loading && text}
      {loading && <LoadingSpinner width={20} height={20} />}
    </button>
  );
}

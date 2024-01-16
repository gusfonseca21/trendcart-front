import React from "react";

interface BlackButtonProps {
  text: string;
  action: () => void;
  style?: string;
}

export default function BlackButton({ text, action, style }: BlackButtonProps) {
  return (
    <button
      type='submit'
      className={`input bg-black text-white transition-black-opacity flex items-center justify-center h-12 w-full ${style}`}
      onClick={() => action()}
    >
      {text}
    </button>
  );
}

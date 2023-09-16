import React from "react";

interface Props {
  type: "email" | "password";
  value: string;
  changeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  minLength?: number;
}

export default function Input({
  type,
  value,
  changeFunc,
  title,
  minLength = 0,
}: Props) {
  return (
    <>
      <label htmlFor={type}>{title}</label>
      <input
        className='input'
        type={type}
        required
        id={type}
        name={type}
        value={value}
        onChange={changeFunc}
        minLength={minLength}
      />
    </>
  );
}

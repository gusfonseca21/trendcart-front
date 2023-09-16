import React from "react";
import { AuthMode } from ".";

interface Props {
  authMode: AuthMode;
  errorMessage: string;
}

export default function Header({ authMode, errorMessage }: Props) {
  return (
    <div className=' center text-center'>
      <h2 className='text-2xl mb-3'>
        {authMode === "signIn" ? "Entrar" : "Registrar"}
      </h2>
      <h2 className='text-xl text-red-400 flex flex-row items-center mb-5'>
        {errorMessage}
      </h2>
    </div>
  );
}

import axios from "axios";
import React, { useState } from "react";

interface Props {
  openSignIn: boolean;
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type AuthMode = "signIn" | "register";

const inputStyle = "border border solid border-gray-300 px-2 py-3";

export default function SignInModal({ openSignIn, setOpenSignIn }: Props) {
  const [authMode, setAuthMode] = useState<AuthMode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authServiceUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/users";

  function closeModalHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      setOpenSignIn(false);
    }
  }

  function changeEmailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function changePasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function sendRequestHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (authMode === "signIn") {
      const result = await axios.post(authServiceUrl + "/login", {
        email,
        password,
      });

      console.log(result);
    }

    if (authMode === "register") {
      const result = await axios.post(authServiceUrl + "/signup", {
        email,
        password,
      });

      console.log(result.data);
    }
  }

  function changeAuthMode() {
    setAuthMode((prevState) =>
      prevState === "signIn" ? "register" : "signIn"
    );
  }

  return (
    <div
      onClick={(e) => closeModalHandler(e)}
      className={
        openSignIn
          ? "w-full bg-black bg-opacity-20 fixed top-0 left-0 bottom-0 z-20 flex justify-center items-center"
          : "hidden"
      }
    >
      <dialog
        className='h-[35rem] w-144 bg-white z-30 flex flex-col justify-center items-center'
        open={openSignIn}
      >
        <h2 className='text-2xl'>
          {authMode === "signIn" ? "Entrar" : "Registrar"}
        </h2>
        <form
          onSubmit={(e) => sendRequestHandler(e)}
          className='flex flex-col w-full p-10 gap-5'
        >
          <label htmlFor='email'>Endereço de email *</label>
          <input
            className={inputStyle}
            type='text'
            id='email'
            name='email'
            value={email}
            onChange={changeEmailHandler}
          />
          <label htmlFor='password'>Senha *</label>
          <input
            className={inputStyle}
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={changePasswordHandler}
          />
          <button type='submit' className={`${inputStyle} bg-black text-white`}>
            {authMode === "signIn" ? "Entrar" : "Registrar"}
          </button>
          <button
            onClick={changeAuthMode}
            type='button'
            className={`${inputStyle} bg-white text-black`}
          >
            {authMode === "signIn" ? "Criar uma conta" : "Entrar"}
          </button>
        </form>
      </dialog>
    </div>
  );
}

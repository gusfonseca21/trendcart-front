import axios from "axios";
import React, { useRef, useState } from "react";

interface Props {
  openSignIn: boolean;
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type AuthMode = "signIn" | "register";

const inputStyle = "border border solid border-gray-300 px-2 py-3";

const animationStyle = "animate-fade-in-out";

export default function SignInModal({ openSignIn, setOpenSignIn }: Props) {
  const [authMode, setAuthMode] = useState<AuthMode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [contentTransition, setContentTransition] = useState("");

  const authModeBtnRef = useRef<HTMLButtonElement | null>(null);

  const authServiceUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/users";

  function closeModalHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      setOpenSignIn(false);
    }
  }

  function changeEmailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setEmail(e.target.value);
  }

  function changePasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setPassword(e.target.value);
  }

  async function sendRequestHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.disabled = true;
    try {
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
    } catch (err: any) {
      setErrorMessage(`Erro ao fazer login: ${err.response.data.message}`);
    }
  }

  function changeAuthMode() {
    const btn = authModeBtnRef.current;
    if (btn) {
      btn.disabled = true;
    }
    setContentTransition(animationStyle);
    setTimeout(() => {
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setAuthMode((prevState) =>
        prevState === "signIn" ? "register" : "signIn"
      );
    }, 250);

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
      }
    }, 500);
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
      <dialog className='px-10 py-10 w-144 bg-white z-30' open={openSignIn}>
        <div
          className={`h-full w-full flex flex-col justify-around items-center ${contentTransition}`}
          onAnimationEnd={() => setContentTransition("")}
        >
          <div className='mb-10'>
            <h2 className='text-2xl'>
              {authMode === "signIn" ? "Entrar" : "Registrar"}
            </h2>
            <h2 className='text-xl text-red-500'>{errorMessage}</h2>
          </div>
          <form
            onSubmit={(e) => sendRequestHandler(e)}
            className='flex flex-col w-full  gap-7'
          >
            <div className='flex flex-col gap-2 text-sm'>
              <label htmlFor='email'>Endereço de email *</label>
              <input
                className={inputStyle}
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={changeEmailHandler}
              />
              <label htmlFor='password'>Senha *</label>
              <input
                className={inputStyle}
                type='password'
                required
                minLength={4}
                id='password'
                name='password'
                value={password}
                onChange={changePasswordHandler}
              />
            </div>

            <div className='flex flex-col gap-5'>
              <button
                type='submit'
                className={`${inputStyle} bg-black text-white`}
              >
                {authMode === "signIn" ? "Entrar" : "Registrar"}
              </button>
              <div className="flex w-full relative justify-center before:content-[' '] before:h-px before:w-full before:absolute before:top-1/2 before:-translate-y-1/2 before:bg-black before:-z-1 before:opacity-20">
                <div className='bg-white px-5 z-10'>ou</div>
              </div>
              <button
                onClick={changeAuthMode}
                type='button'
                className={`${inputStyle} bg-white text-black`}
                ref={authModeBtnRef}
              >
                {authMode === "signIn" ? "Criar uma conta" : "Entrar"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

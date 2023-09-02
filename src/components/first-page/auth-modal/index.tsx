import axios from "axios";
import React, { useRef, useState } from "react";
import Backdrop from "./Backdrop";
import CloseWindow from "../../ui/CloseWindow";
import Header from "./Header";
import Input from "./Input";
import LoadingSpinner from "../../ui/LoadingSpinner";
import Separator from "./Separator";

interface Props {
  openSignIn: boolean;
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export type AuthMode = "signIn" | "register";

const changeAuthAnimation = "animate-fade-in-out";
const clickBtnAnimation = "animate-button-click";

export default function SignInModal({ openSignIn, setOpenSignIn }: Props) {
  const [authMode, setAuthMode] = useState<AuthMode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [contentTransition, setContentTransition] = useState("");
  const [reqBtnAnimation, setReqBtnAnimation] = useState("");
  const [loading, setLoading] = useState(false);

  const authModeBtnRef = useRef<HTMLButtonElement | null>(null);

  const authServiceUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/users";

  function closeModalHandler() {
    setEmail("");
    setPassword("");
    setErrorMessage("");
    setOpenSignIn(false);
    setAuthMode("signIn");
  }

  function changeEmailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setEmail(e.target.value);
  }

  function changePasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setPassword(e.target.value);
  }

  function changeAuthMode() {
    const btn = authModeBtnRef.current;
    if (btn) {
      btn.disabled = true;
    }
    setContentTransition(changeAuthAnimation);
    setTimeout(() => {
      setAuthMode((prevState) =>
        prevState === "signIn" ? "register" : "signIn"
      );
      setErrorMessage("");
    }, 250);

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
      }
    }, 500);
  }

  async function sendRequestHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.disabled = true;
    setReqBtnAnimation(clickBtnAnimation);
    if (loading) return;
    console.log("first");
    setLoading(true);
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
      setLoading(false);
    } catch (err: any) {
      setErrorMessage(`Erro: ${err.response.data.message}`);
      setLoading(false);
    }
  }

  return (
    <Backdrop openSignIn={openSignIn} closeModalHandler={closeModalHandler}>
      <dialog
        className={`px-10 py-10 w-144 bg-white z-30 relative flex flex-col justify-around items-center `}
        open={openSignIn}
        onAnimationEnd={() => setContentTransition("")}
      >
        <CloseWindow closeFunction={closeModalHandler} />
        <form
          onSubmit={(e) => sendRequestHandler(e)}
          className={`flex flex-col w-full gap-7 ${contentTransition}`}
        >
          <Header authMode={authMode} errorMessage={errorMessage} />
          <div className='flex flex-col gap-2 text-sm'>
            <Input
              title='Endereço de email *'
              value={email}
              type='email'
              changeFunc={changeEmailHandler}
            />
            <Input
              title='Senha *'
              value={password}
              type='password'
              changeFunc={changePasswordHandler}
              minLength={4}
            />
          </div>
          <div className='flex flex-col gap-5'>
            <button
              disabled={loading}
              type='submit'
              className={`input bg-black text-white transition-black-opacity ${reqBtnAnimation}`}
              onAnimationEnd={() => setReqBtnAnimation("")}
            >
              {!loading && (authMode === "signIn" ? "Entrar" : "Registrar")}
              {loading && <LoadingSpinner />}
            </button>
            <Separator />
            <button
              onClick={changeAuthMode}
              type='button'
              className='input bg-white text-black hover:border-black active:animate-button-click'
              ref={authModeBtnRef}
            >
              {authMode === "signIn" ? "Criar uma conta" : "Entrar"}
            </button>
          </div>
        </form>
      </dialog>
    </Backdrop>
  );
}

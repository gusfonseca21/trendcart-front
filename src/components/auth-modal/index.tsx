import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import Backdrop from "./Backdrop";
import CloseWindow from "../ui/CloseWindow";
import Header from "./Header";
import Input from "./Input";
import LoadingSpinner from "../ui/LoadingSpinner";
import Separator from "./Separator";
import { toast } from "react-toastify";
import { UserContext } from "@/context/UserContext";

interface Props {
  openSignIn: boolean;
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export type AuthMode = "signIn" | "register" | "forgot";

const changeAuthAnimation = "animate-fade-in-out";
const clickBtnAnimation = "animate-button-click";

export default function SignInModal({ openSignIn, setOpenSignIn }: Props) {
  const [authMode, setAuthMode] = useState<AuthMode>("signIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [contentTransition, setContentTransition] = useState("");
  const [reqBtnAnimation, setReqBtnAnimation] = useState("");
  const [loading, setLoading] = useState(false);

  const userContext = useContext(UserContext);

  const authModeBtnRef = useRef<HTMLButtonElement | null>(null);

  const authServiceUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/users";

  function closeModalHandler() {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setErrorMessage("");
    setOpenSignIn(false);
    setAuthMode("signIn");
  }

  function changeNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function changeEmailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setEmail(e.target.value);
  }

  function changePasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setPassword(e.target.value);
  }

  function changePasswordConfirmHandler(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setErrorMessage("");
    setPasswordConfirm(e.target.value);
  }

  function changeAuthMode(mode?: AuthMode) {
    const btn = authModeBtnRef.current;
    if (btn) {
      btn.disabled = true;
    }
    setContentTransition(changeAuthAnimation);
    setTimeout(() => {
      if (!mode) {
        setAuthMode((prevState) =>
          prevState === "signIn" ? "register" : "signIn"
        );
      } else {
        setAuthMode(mode);
      }
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
    setLoading(true);
    try {
      if (authMode === "signIn") {
        const result = await request("/login");
        if (result?.status === 200) {
          userContext.updateLoggedUser(result.data.user);
          closeModalHandler();
          toast("Login feito com sucesso");
        }
      }

      if (authMode === "register") {
        if (password !== passwordConfirm) {
          setErrorMessage("As senhas devem ser iguais");
          setLoading(false);
          return;
        }
        const result = await request("/signup");

        if (result?.status === 201) {
          userContext.updateLoggedUser(result.data.user);
          closeModalHandler();
          toast("Conta criada com sucesso");
        }
      }

      if (authMode === "forgot") {
        const result = await request("/forgot-password");

        if (result?.status === 200) {
          toast(
            "O link para alteração de senha foi enviado ao seu email. Verifique a caixa de SPAM",
            { autoClose: 5000 }
          );
          closeModalHandler();
        } else {
          toast.error(
            "Houve um erro durante a requisição. Cheque o e-mail ou tente novamente mais tarde",
            { autoClose: 5000 }
          );
        }
      }

      setLoading(false);
    } catch (err: any) {
      setErrorMessage(`Erro: ${err.response.data.message}`);
      setLoading(false);
    }
  }

  const request = async (service: string) => {
    if (service === "/signup") {
      return await axios.post(authServiceUrl + service, {
        name,
        email,
        password,
        passwordConfirm,
      });
    }

    if (service === "/login") {
      return await axios.post(authServiceUrl + service, {
        email,
        password,
      });
    }

    if (service === "/forgot-password") {
      return await axios.post(authServiceUrl + service, {
        email,
      });
    }
  };

  return (
    <Backdrop openSignIn={openSignIn} closeModalHandler={closeModalHandler}>
      <dialog
        className={`px-10 py-10 w-144 bg-white z-50 relative flex flex-col justify-around items-center `}
        open={openSignIn}
        onAnimationEnd={() => setContentTransition("")}
      >
        <CloseWindow closeFunction={closeModalHandler} />
        <form
          onSubmit={(e) => sendRequestHandler(e)}
          className={`flex flex-col w-full gap-0 ${contentTransition}`}
        >
          <Header authMode={authMode} errorMessage={errorMessage} />
          <div className='flex flex-col gap-3 pb-5 text-sm'>
            {authMode === "register" ? (
              <Input
                title='Nome*'
                value={name}
                type='name'
                minLength={4}
                changeFunc={changeNameHandler}
              />
            ) : null}
            <Input
              title='Endereço de email *'
              value={email}
              type='email'
              changeFunc={changeEmailHandler}
            />
            {authMode !== "forgot" ? (
              <Input
                title='Senha *'
                value={password}
                type='password'
                changeFunc={changePasswordHandler}
                minLength={4}
              />
            ) : null}

            {authMode === "signIn" ? (
              <span
                className='cursor-pointer hover:underline max-w-max-content'
                onClick={() => changeAuthMode("forgot")}
              >
                Esqueci minha senha
              </span>
            ) : null}
            {authMode === "register" ? (
              <Input
                title='Confirmação de Senha *'
                value={passwordConfirm}
                type='password'
                changeFunc={changePasswordConfirmHandler}
                minLength={4}
              />
            ) : null}
          </div>
          <div className='flex flex-col gap-5 justify-center'>
            <button
              disabled={loading}
              type='submit'
              className={`input bg-black text-white transition-black-opacity ${reqBtnAnimation} flex items-center justify-center h-12`}
              onAnimationEnd={() => setReqBtnAnimation("")}
            >
              {!loading &&
                (authMode !== "forgot"
                  ? authMode === "signIn"
                    ? "Entrar"
                    : "Registrar"
                  : "Enviar")}
              {loading && <LoadingSpinner width={20} height={20} />}
            </button>
            <Separator />
            <button
              onClick={() => changeAuthMode()}
              type='button'
              className='input bg-white text-black hover:border-black active:animate-button-click h-12'
              ref={authModeBtnRef}
            >
              {authMode !== "forgot"
                ? "signIn"
                  ? "Criar uma conta"
                  : "Entrar"
                : "Voltar"}
            </button>
          </div>
        </form>
      </dialog>
    </Backdrop>
  );
}

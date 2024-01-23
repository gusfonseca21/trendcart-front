"use client";

import Input from "@/components/auth-modal/Input";
import BlackButton from "@/components/ui/BlackButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ForgotPasswordPageParams {
  params: {
    token: string;
  };
}

const authServiceUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/users";

export default function ForgotPasswordPage({
  params,
}: ForgotPasswordPageParams) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [enable, setEnable] = useState(false);

  const router = useRouter();

  useEffect(() => {
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateToken = async () => {
    try {
      await axios.get(`${authServiceUrl}/validate-reset-token/${params.token}`);
      setEnable(true);
    } catch (err) {
      //@ts-ignore
      toast.error(err.response.data.message);
      router.replace("/");
    }
  };

  const handleRequest = async () => {
    if (loading || errorMessage.trim() !== "") return;
    if (password.trim() === "" || passwordConfirm.trim() === "") {
      setErrorMessage("Defina uma senha nova");
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage("As senhas devem ser iguais");
      setPassword("");
      setPasswordConfirm("");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        `${authServiceUrl}/reset-password/${params.token}`,
        {
          password,
          passwordConfirm,
        }
      );

      if (response.status === 200) {
        toast("Troca de senha realizada com sucesso");
        router.replace("/");
      } else {
        setErrorMessage(
          "Houve um erro ao trocar a senha. Tente novamente mais tarde"
        );
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (err) {
      //@ts-ignore
      setErrorMessage(err.response.data.message);
      setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const changePasswordConfirmHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
    setErrorMessage("");
  };

  if (!enable) return;

  return (
    <div className='w-full h-full flex flex-col justify-center items-center align-middle'>
      <div className='flex flex-col items-center gap-3 pb-5 text-sm '>
        <span className='text-xl text-red-400 absolute top-[30%]'>
          {errorMessage}
        </span>
        <Input
          title='Nova senha *'
          value={password}
          type='password'
          changeFunc={changePasswordHandler}
          minLength={4}
        />
        <Input
          title='Confirmação de nova senha *'
          value={passwordConfirm}
          type='password'
          changeFunc={changePasswordConfirmHandler}
          minLength={4}
        />
        <BlackButton
          text='Confirmar'
          action={handleRequest}
          loading={loading}
          disabled={loading}
        />
      </div>
    </div>
  );
}

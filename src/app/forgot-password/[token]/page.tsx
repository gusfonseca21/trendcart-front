"use client";

import Input from "@/components/auth-modal/Input";
import BlackButton from "@/components/ui/BlackButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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

  const router = useRouter();

  const handleRequest = async () => {
    if (password.trim() === "" || passwordConfirm.trim() === "") {
      toast.error("Defina uma senha nova");
    }

    if (password !== passwordConfirm) {
      toast.error("As senhas devem ser iguais");
      setPassword("");
      setPasswordConfirm("");
    }

    try {
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
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const changePasswordConfirmHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };
  return (
    <div className='w-full h-full flex justify-center items-center align-middle'>
      <div className='flex flex-col items-center gap-3 pb-5 text-sm'>
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
        <BlackButton text='Confirmar' action={handleRequest} />
      </div>
    </div>
  );
}

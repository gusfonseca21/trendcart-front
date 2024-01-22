import { User } from "@/types";
import React from "react";

interface UserPageProps {
  params: {
    user: User;
  };
}

export default function UserPage({ params }: UserPageProps) {
  const user = params.user;
  console.log(user);
  return <div>teste</div>;
}

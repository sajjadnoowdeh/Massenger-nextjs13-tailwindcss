"use client"
import { SessionContext } from "next-auth/react";
import React from "react";

interface IAuthContext {
  children: React.ReactNode;
}

const AuthContextProvider = ({children}:IAuthContext) => {
  return <>{children}</>;
};

export default AuthContextProvider;

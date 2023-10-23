import Image from "next/image";
import React from "react";
import AuthForm from "./components/AuthForm";
import Link from "next/link";

function Home() {
  return (
    <div
      className="
      flex
      min-h-full
      flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
      bg-gray-100
     "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-full">
        <Image
          className="mx-auto w-auto"
          alt="logo"
          src={"/images/logo.png"}
          width={50}
          height={50}
        />
        <h2
        className="
         mt-6
         text-center
         text-3xl
         font-bold
         tracking-tight
         text-gray-900
        "
        >
         Sign to your account
        </h2>
      </div>
      <AuthForm />
      {/* <Link href={'/profile'}>profile</Link>
      <Link href={"/"}>home</Link> */}
    </div>
  );
}

export default Home;

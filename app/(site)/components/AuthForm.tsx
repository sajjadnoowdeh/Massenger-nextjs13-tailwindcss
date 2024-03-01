"use client";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocailButtonl";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
type Variant = "LOGIN" | "REGISTER";
function AuthForm() {
  const session = useSession()
  const [variant, setVariant] = React.useState<Variant>("REGISTER");
  const [isLoding, setIsLoding] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleVariant = React.useCallback(() => {
    if (variant === "REGISTER") {
      setVariant("LOGIN");
    }

    if (variant === "LOGIN") {
      setVariant("REGISTER");
    }
  }, [variant]);

  const onsubmitFunc: SubmitHandler<FieldValues> = (data) => {
    setIsLoding(true);

    if (variant === "REGISTER") {
      //  Axios Register

      axios
        .post("/api/register", data)
        .catch(() => toast.error("Somthing went wrong"))
        .finally(() => setIsLoding(false));
    }
    if (variant === "LOGIN") {
      // NextAuth Sign In

      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credntials");
          }

          if (callback?.ok) {
            console.log("check test");

            toast.success("Logged In!!!");
          }
        })
        .finally(() => {
          setIsLoding(false);
        });
    }
  };

  const setSocialAction = (type: string) => {
    setIsLoding(true);

    // NextAuth Social Sign In
    signIn(type, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credntials");
        }

        if (callback?.ok || !callback?.error) {
          toast.success("Logged In!!");
        }
      })
      .finally(() => {
        setIsLoding(false);
      });
  };


  React.useEffect(()=>{
    if(session.status === "authenticated"){
      console.log('authenticted')
      console.log('status',session.status);
      console.log('data',session.data)
      
    }
  },[session.status])
  return (
    <div
      className="
              mt-8
              sm:mx-auto
              sm:w-full
              bg-white 
              sm:max-w-md"
    >
      <form onSubmit={handleSubmit(onsubmitFunc)}>
        <div
          className="
           px-4 
           py-8
           shadow
           sm:rounded-lg
           sm:h-auto
           sm:px-10
           "
        >
          {variant === "REGISTER" && (
            <Input
              lable="User name"
              id="name"
              register={register}
              errors={errors}
              disabled={isLoding}
            />
          )}
          <Input
            type="email"
            id="email"
            lable="Email Address"
            register={register}
            errors={errors}
            disabled={isLoding}
          />
          <Input
            type="passowrd"
            id="password"
            lable="Password"
            register={register}
            errors={errors}
            disabled={isLoding}
          />

          <Button type="submit" fullWith disabled={isLoding}>
            {variant === "LOGIN" ? "Sign Up" : "Register"}
          </Button>
        </div>
      </form>

      <div className="mt-6 px-10">
        <div className="relative flex justify-center text-sm">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              OR continue with
            </span>
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => setSocialAction("github")}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => setSocialAction("google")}
          />
        </div>

        <div className="flex justify-center px-2 mt-6 gap-2 text-sm text-gray-500 mb-2">
          <div>
            {variant === "LOGIN" ? "New To Messanger?" : "Already has Account?"}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;

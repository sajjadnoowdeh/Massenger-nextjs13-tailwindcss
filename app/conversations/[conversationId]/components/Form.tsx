"use client";
import React from "react";
import { HiPhoto } from "react-icons/hi2";
import { MessageInput } from "./MessageInput";
import { useForm, FieldValues } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi";
import useConversation from "@/app/hooks/useConversationl";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";

export const Form = () => {
  const { conversationId } = useConversation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  console.log("conversatinId", conversationId);

  const handleSubmitForm = (data: FieldValues) => {
    try {
      axios.post("/api/messages", {
        ...data,
        conversationId,
      });
    } catch (error) {
      console.log("error message create:", error);
    }
  };

  const handleUpload = (result: any) => {
    console.log({ result });
     axios.post('/api/messages',{
      image:result?.info?.secure_url,
      conversationId
     }) ;
  };
  return (
    <div className="w-full border-t py-4 px-4 bg-white flex items-center gap-2 lg:gap-4">
      <CldUploadButton
        onUpload={handleUpload}
        options={{ maxFiles: 1 }}
        uploadPreset="druolvfk"
      >
        <HiPhoto />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder={"Write a Message"}
        />

        <button
          type="submit"
          className="p-2 rounded-full bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

"use client";

import React, { useCallback } from "react";
import Modal from "./Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import Button from "./Button";
import useConversation from "../hooks/useConversationl";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface IConfirmModal {
  isOpen?: boolean;
  onClose: () => void;
}
const ConfirmModal: React.FC<IConfirmModal> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = React.useState(false);
  const { conversationId } = useConversation();
  const router = useRouter();
  const handleDeleteConversation = useCallback(() => {
    setLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        console.log("success");
        router.push("/conversations");
        router.refresh();
      })
      .catch((error) => {
        console.log('error',error)
        toast.error("Wrong error delete conversationsId!!!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [conversationId, router, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="mx-auto
           flex
           h-12
           w-12
           flex-shrink-0
           items-center
           justify-center
           rounded-full
           bg-red-100
           sm:mx-0
           sm:h-10
           sm:w-10
        "
        >
          <FiAlertTriangle className="h-6 w-6 text-red-600" size={24} />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="
             text-base
             font-semibold
             leading-6
             text-gray-900
             "
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? this
              conversation
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button danger disabled={loading} onClick={handleDeleteConversation}>
          Delete
        </Button>
        <Button secoundry disabled={loading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

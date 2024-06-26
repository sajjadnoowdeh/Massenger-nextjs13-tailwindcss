"use client"
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface IModal {
  onClose: () => void;
  isOpen?: boolean;
  children:React.ReactNode
}
const Modal: React.FC<IModal> = ({ isOpen, onClose,children }) => {
  return (
    <Transition.Root as={Fragment} show={isOpen}>
      <Dialog as={"div"} className="relative z-50" onClose={onClose}>
        {/* First Transition For Set Background */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
                fixed
                inset-0
                bg-gray-500
                bg-opacity-75
                transition-opacity
                "
          />
        </Transition.Child>
        {/* First Transition For Set Background */}

        <div
          className="
            flex
             min-h-full
            items-center
            justify-center
            p-4
            text-center
            sm:p-0

          "
        >
          <Transition.Child
            as={Fragment}
            enter={"ease-out duration-300"}
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-0"
          >
            <Dialog.Panel
            style={{
              bottom:'120px'
            }}
              className="
                     absolute
                     h-50
                     bottom-8
                     transform
                     overflow-hidden
                     rounded-lg
                     bg-white
                     px-4
                     pb-4
                     text-left
                     shdow-xsl
                     transition-all
                     w-full
                     sm:my-8
                     m:w-full
                     sm:max-w-lg
                     sm:p-6

                    "
            >
              <div
                className="
                         absolute
                         right-0
                         top-0
                         hidden
                         pr-4
                         pt-4
                         sm:block
                         z-10
                       
                    "
              >
                <button
                  type="button"
                  className="
                        rounded-md
                        bg-white

                        text-gray-400
                        hover:text-gray-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-sky-500
                        focus:ring-offset-2
                        focus:ring-offset-2
                      "
                  onClick={onClose}
                >
                  <IoClose className="h-6 w-6" />
                </button>
              </div>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

"use client";
import React, { Fragment, useMemo } from "react";
import useOtherUsers from "@/app/hooks/useOtherUsers";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns/format";
import { Transition, Dialog } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "@/app/components/Avatar";
import Modal from "@/app/components/Modal";
import ConfirmModal from "@/app/components/ConfirmModal";
interface IProfileDrawer {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}
const ProfileDrawer: React.FC<IProfileDrawer> = ({ isOpen, onClose, data }) => {

  const otherUser = useOtherUsers(data);
  const [isOpenConfirm,setIsOpenConfirm] = React.useState(false)
  const createDate = useMemo(() => {
    if (otherUser?.createdAt) {
      return format(new Date(otherUser?.createdAt), "PP");
    }

    return "1403";
  }, [otherUser?.createdAt]);

  const title = useMemo(() => {
    if (otherUser?.name || data?.name) {
      return otherUser.name || data.name;
    }

    return "newTextTitle";
  }, [otherUser?.name, data?.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return "Active";
  }, [data]);
  return (
    <>
    <ConfirmModal 
       isOpen={isOpenConfirm}
       onClose={()=>setIsOpenConfirm(false)}
    />
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as={"div"} onClose={onClose} className={"relative z-50"}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opaticy-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
                   fixed
                   inset-0
                   bg-black
                   bg-opacity-40
                 "
          />
        </Transition.Child>

        <div
          className="
                   fixed
                   inset-0
                   overflow-hidden
               "
        >
          <div
            className="
                   absolute
                   insit-0
                   overflow-hidden 
                  "
          >
            <div
              className="
               
                        fixed
                        inset-y-0
                        right-0
                        flex
                        max-w-full
                        pl-10
                    "
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-0"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel
                  className="
                              
                               w-screen
                               max-w-md
                           "
                >
                  <div
                    className="flex
                                h-full
                                flex-col
                                overflow-y-scroll
                                bg-white
                                py-6
                                shadow-xl
                               
                              "
                  >
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
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
                                  "
                          >
                            <span className="sr-only">Close</span>
                            <IoClose size={24} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="
                        relative mt-6
                        flex-1 px-4
                        sm:px-6
                      "
                    >
                      <div
                        className="
                          flex flex-col items-center
                        "
                      >
                        <div className="mb-2">
                          <Avatar user={otherUser} />
                        </div>
                        <div>{title}</div>

                        <div
                          className="
                             text-sm text-gray-500

                          "
                        >
                          {statusText}
                        </div>
                        <div
                          className="flex
                           gap-10
                           my-8
                          "
                        >
                          <div
                            onClick={() => setIsOpenConfirm(true)}
                            className="
                              flex
                              flex-col
                              gap-3
                              items-center
                              cursor-pointer
                              z-50
                             "
                          >
                            <div
                              
                              className="
                              w-10
                              h-10
                              bg-neutral-100
                              rounded-full
                              flex
                              items-center
                              justify-center
                            "
                            >
                              <IoTrash size={20} />
                            </div>
                            <div
                      
                              className="
                                   text-sm
                                   font-light
                                   text-neutral-600
                                "
                            >
                              Delete
                            </div>
                          </div>
                        </div>

                        <div
                          className="
                        w-full
                        pb-5
                        pt-5
                        sm:px-0
                        sm:pt-0
                        "
                        >
                          <dl
                            className="space-y-8
                            px-4
                            sm:space-y-6
                            sm:px-6

                            
                           "
                          >
                            {!data.isGroup && (
                              <div>
                                <dt
                                  className="
                                      text-sm
                                      font-medium
                                      text-gray-500
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                ></dt>
                                <dd
                                  className="
                                    mt-1
                                    text-sm
                                    text-gray-900
                                    sm:col-span-2
                                  "
                                >
                                  {otherUser?.email ? otherUser.email : 'test@gmail.com'}
                                </dd>
                              </div>
                            )}
                            {!data.isGroup && (
                              <>
                                <hr />
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Joinded
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    <time dateTime={createDate}>
                                      {createDate}
                                    </time>
                                  </dd>
                                </div>
                              </>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  );
};

export default ProfileDrawer;

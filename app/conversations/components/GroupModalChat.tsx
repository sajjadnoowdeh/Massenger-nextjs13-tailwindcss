"use client";

import React from "react";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import { User } from "@prisma/client";
import { useForm, FieldValues } from "react-hook-form";
import Select from "@/app/components/inputs/Select";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
interface IGroupModalChat {
  isOpen: boolean;
  onClose: () => void;
  users?: User[];
}
const GroupModalChat: React.FC<IGroupModalChat> = ({
  isOpen,
  onClose,
  users,
}) => {
  console.log({ users });

  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch('members')

  console.log('members watch',members);


  const handleSubmitAddGroup = (data:FieldValues)=>{

    setIsLoading(true)
    axios.post('/api/conversations',{
      ...data,
      isGroup:true
    }).then(()=>{
        router.refresh()
        onClose()
    }).catch(()=>{
      toast.error('Wrong is AddGroup ')
    }).finally(()=>{
      setIsLoading(false)
    })
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form action="#" onSubmit={handleSubmit(handleSubmitAddGroup)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-2">
              <Input
                id="name"
                register={register}
                lable="Name"
                disabled={isLoading}
                errors={errors}
                required
              />

              <div className="mt-3">
                <label htmlFor="Members">Members</label>
                 <Select
                  name="mebmers"
                  disabled={isLoading}
                  value={members}
                  onChange={(value)=>setValue('members',value)
                  }
                  options={users?.map((user) => ({
                    value: user.id,
                    label: user.name,
                  }))}
                  isMulti={true}

                /> 
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
           <Button secoundry>
             Close
           </Button>
           <Button >
             Save
           </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupModalChat;

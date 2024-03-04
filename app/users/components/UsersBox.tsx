'use client'
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface IUsersBox {
  user: User;
}
const UsersBox: React.FC<IUsersBox> = ({ user }) => {
  const router = useRouter();
  const [loading,setLoading] = React.useState(false)
  const handleClick = useCallback(() => {
    setLoading(true)

      axios
        .post("/api/conversation", {userId:user.id})
        .then((data) => router.push(`/api/conversation/${user.id}`))
        .finally(()=>setLoading(true))
    
  }, [user, router]);
  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-500 rounded-lg transition cursor-pointer"
    >
      <Avatar user={user} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1 ">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersBox;

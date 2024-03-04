import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface IAvatar {
  user: User;
}
const Avatar: React.FC<IAvatar> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block overflow-hidden rounded-full h-9 w-9 md:h-11 md:h-11">
        <Image src={user?.image || "/images/avatar.png"} fill alt="avatar" className="object-fill" />
      </div>
      <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 w-2 h-2 md:h-3 md:w-3">

      </span>
    </div>
  );
};

export default Avatar;

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
    </div>
  );
};

export default Avatar;

"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface IAvatarGroup {
  users: User[];
}
const AvatarGroup: React.FC<IAvatarGroup> = ({ users = [] }) => {
  const usersSlices = users.slice(0, 3);

  const MapPosition = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {usersSlices.map((user, index) => (
        <div className={`
          absolute
          inline-block
          rounded-full
          overflow-hidden
          h-[21px]
          w-[21px]
          ${MapPosition[index as keyof typeof MapPosition]}
        `} key={index}>
          <Image
           fill
           alt="Avatar"
           src={user?.image || "data:image/jpeg;base64,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"}
           
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;


import { useMemo, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
return (
    <Sidebar>
      <div className="h-full">
        UsersLayout

      </div>
    </Sidebar>
  );
};


export default UsersLayout;

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


// Server Actions - function
export const getSession = async () => {
  return await getServerSession(authOptions);
};

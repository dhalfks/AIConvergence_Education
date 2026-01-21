import { cookies } from "next/headers";
import { authCookieName, verifyToken } from "@/lib/auth";

export const getUserIdFromCookie = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(authCookieName)?.value;
  if (!token) return null;
  try {
    const payload = await verifyToken(token);
    return payload.userId ?? null;
  } catch {
    return null;
  }
};

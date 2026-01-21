import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "it_terms_session";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set.");
  }
  return new TextEncoder().encode(secret);
};

export const signToken = async (payload: { userId: string }) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
};

export const verifyToken = async (token: string) => {
  const { payload } = await jwtVerify<{ userId: string }>(
    token,
    getJwtSecret()
  );
  return payload;
};

export const authCookieName = COOKIE_NAME;

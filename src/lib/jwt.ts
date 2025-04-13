import { SignJWT, jwtVerify, JWTPayload } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

const JWT_ALGORITHM = "HS256";
const JWT_EXPIRATION_TIME = "24h";

export async function signJwtToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .sign(JWT_SECRET);
  return token;
}

export async function verifyJwtToken(
  token: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify<JWTPayload>(token, JWT_SECRET);
    return payload;
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      console.warn("Token has expired");
    } else {
      console.error("Token verification failed:", error.message);
    }
    return null;
  }
}

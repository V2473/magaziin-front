import jwt from "jsonwebtoken";

// Define a custom error type for JWT-related errors
interface JwtError extends Error {
  name: string;
  message: string;
}

// Define the payload type (you can extend this as needed)
interface JwtPayload {
  [key: string]: unknown;
}

/**
 * Signs a JWT with the provided payload and options
 * @param payload - The data to encode in the JWT
 * @param expiresIn - Token expiration time (default: 1 day)
 * @returns Signed JWT token
 * @throws Error if JWT_SECRET is not defined or signing fails
 */
export const signJwt = (payload: JwtPayload, expiresIn: string | number = "1d"): string => {
  if (!process.env.APP_JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const token = jwt.sign(payload, process.env.APP_JWT_SECRET, {
      algorithm: "HS512",
      expiresIn,
    });
    return token;
  } catch (error) {
    const jwtError = error as JwtError;
    throw new Error(`Failed to sign JWT: ${jwtError.message}`);
  }
};

/**
 * Verifies a JWT and returns the decoded payload
 * @param token - The JWT to verify
 * @returns Decoded payload
 * @throws Error if verification fails or JWT_SECRET is not defined
 */
export const verifyJwt = (token: string): JwtPayload => {
  if (!process.env.APP_JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const data = jwt.verify(token, process.env.APP_JWT_SECRET, {
      algorithms: ["HS512"],
    }) as JwtPayload;
    return data;
  } catch (error) {
    const jwtError = error as JwtError;
    throw new Error(`Failed to verify JWT: ${jwtError.message}`);
  }
};
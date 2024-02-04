import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { env } from "node:process";
import type { User } from "../../types.js";

const secret = env.SECRET_KEY || randomUUID();

export function generateToken<T extends string | Buffer | object>(payload: T): string {
    // token expires in 1 day
    return jwt.sign(payload, secret, {
        expiresIn: "1d",
        algorithm: "HS512"
    });
}

export function verifyToken(token: string) {
    try {
        /**
         * TODO: asynchronously verify token
         */
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

export function refreshExpiredToken(token: string) {
    const decodedToken = jwt.decode(token) as User | null;

    if (decodedToken && Date.now() >= (decodedToken?.exp || 0) * 1000) {

        const { uid, role } = decodedToken;

        return generateToken({ uid, role });
    }

    // Token not expired or couldn't be decoded
    return token;
}
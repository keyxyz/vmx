import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { env } from "node:process";
const secret = env.SECRET_KEY || randomUUID();
export function generateToken(payload) {
    return jwt.sign(payload, secret, {
        expiresIn: "1d",
        algorithm: "HS512"
    });
}
export function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    }
    catch (error) {
        return null;
    }
}
export function refreshExpiredToken(token) {
    const decodedToken = jwt.decode(token);
    if (decodedToken && Date.now() >= (decodedToken?.exp || 0) * 1000) {
        const { uid, role } = decodedToken;
        return generateToken({ uid, role });
    }
    return token;
}

import type { NextFunction, Request, Response } from "express";
import { refreshExpiredToken, verifyToken } from "./token.js";
import payload from "../../helpers/payload.js";
import type { User as IUser } from "../../types.js";
import User from "./model.js";
import { cookie } from "../../util/session.js";

class AccessError extends Error {
    constructor() {
        super();
        this.message = "Unauthorized Access";
    }
}

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) throw new AccessError();

        const refreshedToken = refreshExpiredToken(token);

        if (refreshedToken !== token) {
            // if the token was refreshed, send the new token in the response header
            res.setHeader('Authorization', `Bearer ${refreshedToken}`);
        }

        const decodedToken = verifyToken(refreshedToken) as IUser | null;

        if (!decodedToken) throw new AccessError();

        // verify if user still exists
        const user = await User.findByPk(decodedToken.uid);

        if (!user) throw new AccessError();

        // Attach the user object to the request
        req.user = {
            uid: decodedToken.uid,
            role: user.getDataValue("role")
        };

        // store token in cookies - for frontend use
        res.cookie('authToken', refreshedToken, {
            httpOnly: true,
            secure: cookie.SECURE,
            expires: cookie.EXPIRY_DATE
        });

        next();
    } catch (error) {
        res.status(401).json(payload("error", "Unauthorized Access"));
    }
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
    const { user } = req;

    if (!user || user.role !== 'admin') {
        return res.status(403).json(payload("error", "Unauthorized Access"));
    }

    next();
}
